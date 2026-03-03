import { Injectable, inject } from '@angular/core'; // Vérifie bien cette ligne
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../../shared/models/category.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = '${environment.apiUrl}/categories';

  getCategories(): Observable<Category[]> {
    // On définit le type de la réponse pour que 'response' soit reconnu
    return this.http.get<{ success: boolean; data: Category[] }>(this.apiUrl).pipe(
      map((response) => response.data) // Parenthèses ajoutées pour la clarté
    );
  }

  createCategory(name: string): Observable<Category> {
    return this.http.post<{ success: boolean; data: Category }>(this.apiUrl, { name }).pipe(
      map((response) => response.data)
    );
  }

  /**
   * Récupère toutes les catégories triées par nom (ASC) 
   * via ton service Backend Category.findAll
   */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<{ success: boolean; data: Category[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  deleteCategory(id: number): Observable<any> {
  // On construit l'URL avec l'ID, par exemple : http://localhost:3000/api/categories/5
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}