import { Routes } from '@angular/router';
import { ContactFormComponent } from './features/contact/contact-form/contact-form.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectFormComponent } from './features/admin/project-form/project-form.component';
// 1. IMPORT DU NOUVEAU COMPOSANT
import { CategoryAdminComponent } from './features/admin/category-admin/category-admin.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';
import { ProjectEditComponent } from './features/admin/components/project-edit/project-edit.component';

import { authGuard } from './core/guards/auth.guard'; 

export const routes: Routes = [
  /**
   * ACCUEIL & AUTH
   */
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  /**
   * ROUTES PUBLIQUES
   */
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'contact', component: ContactFormComponent },

  /** * ESPACE ADMINISTRATION (Protégé)
   */
  { 
    path: 'admin/add-project', 
    component: ProjectFormComponent, 
    canActivate: [authGuard] // Réactivé pour la sécurité
  },
  { 
    path: 'admin/categories', 
    component: CategoryAdminComponent, 
    canActivate: [authGuard] // Protection de la gestion des catégories
  },
  { 
    path: 'admin/edit/:id', 
    component: ProjectEditComponent, 
    canActivate: [authGuard]
  },

  /**
   * WILDCARD (404)
   * Toujours en dernier !
   */
  { path: '**', redirectTo: '' } ,


  { path: 'project/:id', component: ProjectDetailComponent }
];