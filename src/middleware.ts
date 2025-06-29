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
          // If the cookie is set, update the request's cookies for the current
          // server-side pass, and update the response's cookies for the browser.
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the request's cookies for the current
          // server-side pass, and update the response's cookies for the browser.
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

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

  // Return the original response, which may have been modified with an updated
  // session cookie.
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
}
