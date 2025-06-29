import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthContextService } from '../services/authContext.service';

export const RootGuard: CanActivateFn = () => {
  const authContext = inject(AuthContextService);
  const router = inject(Router);

  if (authContext.isRoot()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}