import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // This single getUser() call is the official way to refresh the session
  // and get the user's status in a single, reliable step.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // If user is not logged in and is trying to access a protected admin route, redirect to login
  if (!user && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const url = new URL('/admin/login', request.url)
    return NextResponse.redirect(url)
  }

  // If user is logged in and tries to access the login page, redirect to the dashboard
  if (user && pathname === '/admin/login') {
    const url = new URL('/admin/dashboard', request.url)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
}
