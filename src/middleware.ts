import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('YOUR_SUPABASE_URL')
  ) {
    // Supabase credentials are not configured.
    // We will skip the auth logic and allow the request to proceed.
    // The user will be redirected to the login page if they try to access a protected route.
    console.warn(
      'Supabase environment variables are not configured. Skipping auth middleware.'
    )
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers, }})
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers, }})
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl
  
  if (!user && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  if (user && pathname === '/admin/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/admin/login',
  ],
}
