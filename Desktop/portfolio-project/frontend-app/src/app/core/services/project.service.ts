// src/app/core/services/project.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../../shared/models/project.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient); // Approche moderne
  private apiUrl = '${environment.apiUrl}/projects';

  /**
   * RÉCUPÉRER TOUS LES PROJETS
   * On utilise .pipe(map(...)) car Sequelize renvoie les données dans un objet 'data'
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<{ success: boolean; data: Project[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  /**
   * CRÉER UN PROJET
   * Note : 'projectData' sera un FormData si tu envoies une image
   */
  createProject(projectData: FormData | any): Observable<Project> {
    return this.http.post<{ success: boolean; data: Project }>(this.apiUrl, projectData).pipe(
      map(response => response.data)
    );
  }

getProjectById(id: number): Observable<Project> {
  // 💡 Vérifie bien si c'est `${this.apiUrl}/${id}` ou `${this.apiUrl}/projects/${id}`
  return this.http.get<{ success: boolean; data: Project }>(`${this.apiUrl}/${id}`).pipe(
    map(response => {
      console.log("Données brutes de l'API :", response);
      return response.data; // On extrait uniquement la partie 'data'
    })
  );
}

deleteProject(id: number): Observable<any> {
  // On utilise uniquement l'ID car /projects est déjà inclus dans this.apiUrl
  return this.http.delete(`${this.apiUrl}/${id}`);
}

updateProject(id: number, projectData: any): Observable<any> {
  // On envoie un PUT vers l'ID spécifique
  return this.http.put(`${this.apiUrl}/${id}`, projectData);
}
}