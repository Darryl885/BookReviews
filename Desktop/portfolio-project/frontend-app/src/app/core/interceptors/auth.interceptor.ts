import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // On récupère le token
  const token = localStorage.getItem('auth_token');

  console.log('--- INTERCEPTEUR CHECK ---');
  console.log('Cible:', req.url);
  console.log('Token extrait du Storage:', token ? 'OUI (commence par ' + token.substring(0,10) + ')' : 'NON (null)');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};