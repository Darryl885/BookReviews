import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { CategoryService } from '../../../core/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  projectForm: FormGroup;
  isLoading = false;
  showSuccess = false;
  categories: any[] = []; 

  constructor() {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      image: [''],
      githubUrl: [''],
      demoUrl: [''],
      categoryId: [null, [Validators.required]] 
    });
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Catégories chargées de la BD:', data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.isLoading = true;

      const formValues = this.projectForm.value;

      /**
       * MAPPING DES DONNÉES :
       * On transforme les noms du formulaire Angular pour matcher 
       * les colonnes de ton modèle Project Sequelize.
       */
      const payload = {
        title: formValues.title,
        description: formValues.description,
        image_url: formValues.image,      // Correspond à image_url en BD
        link_github: formValues.githubUrl, // Correspond à link_github en BD
        link_demo: formValues.demoUrl,    // Correspond à link_demo en BD
        categoryId: formValues.categoryId  // Gardé tel quel pour Joi/Sequelize association
      };

      this.projectService.createProject(payload).subscribe({
        next: (response) => {
          this.showSuccess = true;
          this.isLoading = false;
          this.projectForm.reset();
          
          setTimeout(() => {
            this.showSuccess = false;
            this.router.navigate(['/projects']);
          }, 3000);
        },
        error: (err) => {
          console.error('Erreur Backend:', err.error);
          alert("Erreur : " + (err.error.message || "Vérifiez les champs du formulaire"));
          this.isLoading = false;
        }
      });
    }
  }
}