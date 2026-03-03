import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * BONNE PRATIQUE : provideIn: 'root'
 * Cela crée un "Singleton" (une seule instance du service pour toute l'app).
 * Angular gère automatiquement sa création et sa destruction (Tree-shaking).
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //BONNE PRATIQUE : Centraliser l'URL de l'API (à mettre idéalement dans environment.ts)
private apiUrl = '${environment.apiUrl}/contact';

  constructor(private http: HttpClient) { }

  /**
   * BONNE PRATIQUE : Utiliser les Observables.
   * La méthode retourne un Observable, permettant au composant de 
   * "s'abonner" au résultat (succès ou erreur).
   */
  sendEmail(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
