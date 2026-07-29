import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const cloned = token ? addToken(req, token) : req;

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el error es 401 y no es la propia llamada de refresh, intentamos renovar el token
      if (error.status === 401 && !req.url.includes('/auth/refresh') && authService.getRefreshToken()) {
        return authService.refreshTokens().pipe(
          switchMap((res) => {
            // Reintenta la request original con el nuevo access token
            return next(addToken(req, res.access_token));
          }),
          catchError((refreshError) => {
            // Si el refresh también falla, cerramos la sesión
            authService.clearSession();
            return throwError(() => refreshError);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};

function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}
