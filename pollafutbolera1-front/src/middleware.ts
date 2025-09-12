import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // const currentUserCookie = request.cookies.get('currentUser')?.value;
  
  // let accessToken = null;
  // let userRole = null;
  // let userCompany = null;
  
  // if (currentUserCookie) {
  //   try {
  //     const userData = JSON.parse(currentUserCookie);
      
  //     accessToken = userData.accessToken;
  //     userCompany = userData.company; 
      
  //     if (accessToken) {
  //       const parts = accessToken.split('.');
  //       if (parts.length === 3) {
  //         const base64Payload = parts[1];
  //         const payload = Buffer.from(base64Payload, 'base64').toString('utf8');
  //         const tokenData = JSON.parse(payload);
          
  //         userRole = tokenData.role || null;
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error parsing user data from cookie:', error);
  //   }
  // }
  
  // const { pathname } = request.nextUrl;

  // // Verificar si el usuario está autenticado y con un Rol Correcto
  // if (userRole === null || (userRole !== 'ADMIN'  && userRole !== 'USER' && userRole !== 'COMPANY_ADMIN')) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }
  
  // // Validación de rutas ADMIN
  // if (pathname.includes('admin') && !pathname.includes('company_admin')) {
  //   if (userRole !== 'ADMIN') {
  //     return NextResponse.redirect(new URL('/unauthorized', request.url));
  //   }
  // }
  

  // // Validación de rutas COMPANY_ADMIN
  // if (pathname.includes('/company_admin')) {
  //   if (userRole !== 'COMPANY_ADMIN') {
  //     return NextResponse.redirect(new URL('/unauthorized', request.url));
  //   }
  // }

  // // Validar rutas /polla/[id] - OPTIMIZADO
  // if (pathname.startsWith('/polla/')) {
  //   try {
  //     const pathSegments = pathname.split('/');
  //     const pollaIndex = pathSegments.findIndex(segment => segment === 'polla');
      
  //     if (pollaIndex !== -1 && pathSegments[pollaIndex + 1]) {
  //       const pollaId = pathSegments[pollaIndex + 1];
        
  //       // Verificar que tenemos las cookies necesarias
  //       const authToken = request.cookies.get('token')?.value || accessToken;
        
  //       if (!currentUserCookie || !authToken) {
  //         return NextResponse.redirect(new URL('/auth/login', request.url));
  //       }

  //       let currentUser;
  //       try {
  //         //  Tratar de tomar la CurrentUser cookie
  //         currentUser = JSON.parse(currentUserCookie);
  //       } catch {
  //         return NextResponse.redirect(new URL('/auth/login', request.url));
  //       }
  //       // Hacer la validación de la polla
  //       try {
  //         const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
          
  //         if (!apiBaseUrl) {
  //           console.error('API_BASE_URL no está definida');
  //           return NextResponse.redirect(new URL('/error', request.url));
  //         }

  //         const response = await fetch(`${apiBaseUrl}/pollafutbolera/polla/${pollaId}`, {
  //           method: 'GET',
  //           headers: {
  //             'Authorization': `Bearer ${authToken}`,
  //             'X-TenantId': currentUser.tenantId?.toString() || '',
  //             'Content-Type': 'application/json',
  //             'Cache-Control': 'no-cache'
  //           },
  //         });

  //         // validition de request status
  //         if (!response.ok) {
  //           // not-jwt value
  //           if (response.status === 401 || response.status === 403) {
  //             return NextResponse.redirect(new URL('/auth/login', request.url));
  //           }
  //           // not found a polla with that id
  //           if (response.status === 404) {
  //             console.log(response.status)
  //             return NextResponse.redirect(new URL('/unauthorized', request.url));
  //           }
  //           // any other random error with a status != ok
  //           return NextResponse.redirect(new URL('/unauthorized', request.url));
  //         }

  //         const pollaRes = await response.json();

  //         // Validar que la polla pertenece a la compañía del usuario
  //         if (pollaRes?.company?.id && userCompany && pollaRes.company.id !== userCompany) {
  //           return NextResponse.redirect(new URL('/unauthorized', request.url));
  //         }

  //       } catch (fetchError) {
  //         // Error validating polla access
  //         return NextResponse.redirect(new URL('/auth/login', request.url));
  //       }
  //     }
  //   } catch (error) {
  //     // Error en middleware polla validation
  //     return NextResponse.redirect(new URL('/auth/login', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/polla/polla-configuration/:path*',
    '/juega/:path*',
    '/estadisticas/:path*',
    '/ranking/:path*',
    '/premios/:path*',
    '/polla/:path*'
  ],
}