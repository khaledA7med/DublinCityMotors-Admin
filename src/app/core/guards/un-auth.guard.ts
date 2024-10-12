import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const unAuthGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router = inject(Router);
  if (!auth.isUserTokenAvailable) {
    return true;
  }
  router.navigate(['/'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
