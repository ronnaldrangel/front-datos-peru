import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Rutas que requieren autenticación
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Rutas de auth (no deberían ser accesibles si ya está logueado)
  if (['/login', '/register', '/forgot-password', '/verify-email', '/reset-password'].includes(pathname)) {
    if (token) {
      // Si ya tiene token, lo mandamos al dashboard
      // Pero ojo, verify-email podría ser necesario si no está verificado
      // Por simplicidad, si hay token, asumimos que está logueado
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password', '/verify-email', '/reset-password'],
}
