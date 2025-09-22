import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper to check multiple cookie sources
function getSessionToken(request: NextRequest): string | null {
  // Method 1: Check request.cookies (parsed)
  const token = request.cookies.get('next-auth.session-token')?.value
  
  if (token) return token
  
  // Method 2: Check raw cookie header (sometimes more immediate)
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) {
    const match = cookieHeader.match(/next-auth\.session-token=([^;]+)/)
    if (match) return match[1]
  }
  
  return null
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for public routes
  if (pathname.startsWith('/login') || 
      pathname.startsWith('/register') || 
      pathname.startsWith('/forget-password') ||
      pathname.startsWith('/api/auth') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/favicon.ico')) {
    return NextResponse.next()
  }
  
  // Check for token immediately
  let token = getSessionToken(request)
  
  // If no token, wait and try again
  if (!token) {
    console.log('No immediate token, waiting 300ms...')
    await new Promise(resolve => setTimeout(resolve, 300))
    token = getSessionToken(request)
  }
  
  // If still no token, one more quick check
  if (!token) {
    console.log('Second check failed, waiting another 200ms...')
    await new Promise(resolve => setTimeout(resolve, 200))
    token = getSessionToken(request)
  }
  
  if (!token) {
    console.log('No token found after all attempts, redirecting from:', pathname)
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  console.log('Token found, allowing access to:', pathname)
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/cart', '/wishList', '/products', '/categories', '/brands' , "/allorders"],
}