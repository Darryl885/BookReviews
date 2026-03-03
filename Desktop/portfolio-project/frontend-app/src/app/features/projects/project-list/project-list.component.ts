import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);
  private authService = inject(AuthService);

  projects: any[] = [];
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Erreur SQL :', err)
    });
  }

  onDelete(id: number, title: string) {
    // 🛡️ Double vérification avant suppression
    const confirmDelete = confirm(`⚠️ ALERTE SÉCURITÉ : Voulez-vous vraiment supprimer le projet "${title}" de la base de données ?`);
    
    if (confirmDelete) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          // Mise à jour de l'affichage local sans recharger la page
          this.projects = this.projects.filter(p => p.id !== id);
          console.log(`Projet ${id} supprimé avec succès.`);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert("Erreur : Impossible de supprimer le projet. Vérifiez s'il est lié à d'autres données.");
        }
      });
    }
  }
}