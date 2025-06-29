import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // This `response` object is mutable and will be passed to the Supabase client.
  const response = NextResponse.next({
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
          // The `set` method is called by `getUser` to update the session cookie.
          // It's crucial to update the cookies on the `response` object.
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // The `remove` method is called by `signOut` to clear the session cookie.
          // It's crucial to update the cookies on the `response` object.
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
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

  // If user is not logged in and is trying to access a protected admin route, redirect to login.
  if (!user && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If user is logged in and tries to access the login page, redirect to the dashboard.
  if (user && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Return the response, which will have the updated session cookie if it was refreshed.
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
}
