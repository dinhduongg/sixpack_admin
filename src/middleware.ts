import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authPath = ['/login']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('sessionToken')?.value

  // nếu đăng nhập và ở trang login
  if (sessionToken && authPath.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Nếu chưa đăng nhập thì trả về trang login
  if (!sessionToken && !authPath.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
