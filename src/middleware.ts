// This file has been removed as Supabase authentication is no longer used.
// A client-side authentication check is now handled in src/app/(cms)/admin-shell.tsx
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
