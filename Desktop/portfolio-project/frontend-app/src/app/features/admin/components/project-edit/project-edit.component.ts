import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { CategoryService } from '../../../../core/services/category.service'; // Ajouté

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private categoryService = inject(CategoryService); // Injecté

  projectForm!: FormGroup;
  projectId!: number;
  categories: any[] = []; // Liste pour le select HTML

  ngOnInit() {
    // 1. Initialiser le formulaire immédiatement (évite les erreurs null dans le template)
    this.initForm();
    
    // 2. Charger les catégories pour le menu déroulant
    this.loadCategories();

    // 3. Récupérer l'ID et charger les données du projet
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.projectId = Number(idParam);
      this.loadProjectData();
    }
  }

  initForm() {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      image: [''],
      githubUrl: [''],
      demoUrl: [''],
      categoryId: [null, [Validators.required]]
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Erreur chargement catégories:', err)
    });
  }

  loadProjectData() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        // Mapping des noms backend -> noms formulaire frontend
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          image: project.image_url,
          githubUrl: project.link_github,
          demoUrl: project.link_demo,
          categoryId: project.categoryId
        });
      },
      error: (err) => console.error('Erreur chargement projet:', err)
    });
  }

  onUpdate() {
    if (this.projectForm.valid) {
      const formValues = this.projectForm.value;
      
      // On prépare le payload avec les noms de colonnes Sequelize
      const payload = {
        title: formValues.title,
        description: formValues.description,
        image_url: formValues.image,
        link_github: formValues.githubUrl,
        link_demo: formValues.demoUrl,
        categoryId: Number(formValues.categoryId) // Assure un format numérique
      };

      this.projectService.updateProject(this.projectId, payload).subscribe({
        next: () => {
          alert('✅ Projet mis à jour avec succès !');
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          console.error('Erreur Update:', err);
          alert('Erreur lors de la mise à jour.');
        }
      });
    }
  }
}