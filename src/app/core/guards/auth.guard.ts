import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const authGuard = (): boolean => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLogged()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
