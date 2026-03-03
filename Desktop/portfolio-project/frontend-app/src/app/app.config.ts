import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Ajout de withInterceptors

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor'; // Import de ton intercepteur

export const appConfig: ApplicationConfig = {
  providers: [
    
    /**
     * BONNE PRATIQUE : ZoneChangeDetection
     * Optimise les cycles de détection de changement pour de meilleures performances.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    /** * Gestion du routage défini dans app.routes.ts 
     */
    provideRouter(routes), 

    /**
     * BONNE PRATIQUE : Injection globale du HttpClient avec Intercepteurs.
     * On enregistre ici 'authInterceptor' pour qu'il injecte automatiquement 
     * le Token JWT dans chaque requête vers ton Backend Node.js.
     */
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};