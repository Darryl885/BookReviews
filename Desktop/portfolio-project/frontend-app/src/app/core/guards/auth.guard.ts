// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // BONNE PRATIQUE : Vérifier la présence du token JWT
  if (authService.isLoggedIn()) {
    return true; // Accès autorisé
  } else {
    // Redirection vers le login si non connecté
    router.navigate(['/login']);
    return false; // Accès refusé
  }
};