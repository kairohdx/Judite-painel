import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthContextService } from '../services/authContext.service';

export const adminGuard: CanActivateFn = () => {
  const authContext = inject(AuthContextService);
  const router = inject(Router);

  if (authContext.isAdmin()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};