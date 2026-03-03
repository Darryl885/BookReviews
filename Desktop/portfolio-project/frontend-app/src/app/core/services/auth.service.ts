import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '${environment.apiUrl}/auth';

  // 1. On crée un "Subject" qui contient l'état initial (vrai si token présent)
  private authStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('auth_token'));

  // 2. On expose cet état sous forme d'Observable pour la Navbar
  authStatus$ = this.authStatus.asObservable();

login(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
    tap(response => {
      // Ton backend renvoie { data: { token: '...' } }
      const token = response.data?.token; 

      if (token) {
        localStorage.setItem('auth_token', token);
        this.authStatus.next(true);
      }
    })
  );
}

  isLoggedIn(): boolean {
    return this.authStatus.value; // Retourne la dernière valeur connue
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    // 4. ON DIFFUSE : "Je suis déconnecté !"
    this.authStatus.next(false);
  }
}