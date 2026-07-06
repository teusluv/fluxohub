import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que exigem autenticação baseada no Cookie
// Não verificamos Role aqui na Edge por performance/segurança (Isso é feito no Backend), 
// apenas se a sessão existe logicamente no Cookie.
const PROTECTED_ROUTES = [
  /^\/dashboard/,
  /^\/admin/
];

const AUTH_ROUTES = ['/login', '/cadastro', '/esqueci-minha-senha', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A presença deste cookie não garante autenticidade (pode estar expirado), 
  // mas funciona como primeira barreira UX. Se não tem cookie, nem bate no backend.
  const hasSession = request.cookies.has('fluxohub_refresh_token');

  // 1. Redirecionar usuário logado pra fora da tela de login
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route)) && hasSession) {
    // Nós assumimos /dashboard, mas o backend vai bloquear no Hydration se for CLIENTE
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Proteger rotas privadas
  const isProtected = PROTECTED_ROUTES.some((pattern) => pattern.test(pathname));
  if (isProtected && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/|loja/).*)'],
};
