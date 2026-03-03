import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-category-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <h2>📁 Gestion des Catégories</h2>
      
      <div class="add-form">
        <input [(ngModel)]="categoryName" placeholder="Nouvelle catégorie..." (keyup.enter)="onCreate()" />
        <button class="btn-create" (click)="onCreate()" [disabled]="!categoryName.trim()">Créer</button>
      </div>

      <p *ngIf="statusMessage" class="message">{{ statusMessage }}</p>

      <div class="category-list">
        <h3>Liste des catégories ({{ categories.length }})</h3>
        <ul>
          <li *ngFor="let cat of categories">
            <span>{{ cat.name }}</span>
            <button class="btn-delete" (click)="onDelete(cat)">
              Supprimer 🗑️
            </button>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 30px; background: #0f172a; border-radius: 12px; color: white; max-width: 650px; margin: 2rem auto; }
    h2 { color: #a855f7; margin-bottom: 20px; }
    .add-form { display: flex; gap: 10px; margin-bottom: 25px; }
    input { padding: 12px; border: 1px solid #334155; border-radius: 8px; flex: 1; background: #1e293b; color: white; }
    
    .btn-create { background: #a855f7; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-create:disabled { background: #475569; }

    .category-list { border-top: 1px solid #334155; padding-top: 20px; }
    ul { list-style: none; padding: 0; }
    li { 
      background: #1e293b; padding: 12px 15px; border-radius: 8px; margin-bottom: 8px;
      display: flex; justify-content: space-between; align-items: center;
      border-left: 4px solid #a855f7;
    }

    .btn-delete { 
      background: rgba(248, 113, 113, 0.1); color: #f87171; border: 1px solid #f87171;
      padding: 5px 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
    }
    .btn-delete:hover { background: #f87171; color: white; }
    .message { color: #22c55e; margin-bottom: 15px; font-size: 0.9rem; }
  `]
})
export class CategoryAdminComponent implements OnInit {
  private categoryService = inject(CategoryService);
  categories: Category[] = [];
  categoryName: string = '';
  statusMessage: string = '';

  ngOnInit() { this.loadCategories(); }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(data => this.categories = data);
  }

  onCreate() {
    this.categoryService.createCategory(this.categoryName).subscribe(() => {
      this.categoryName = '';
      this.loadCategories();
      this.showMessage("Catégorie ajoutée !");
    });
  }

  onDelete(category: Category) {
    if (confirm(`Supprimer la catégorie "${category.name}" ?`)) {
      this.categoryService.deleteCategory(category.id!).subscribe({
        next: () => {
          this.loadCategories();
          this.showMessage("Catégorie supprimée");
        },
        error: () => this.showMessage("Erreur : La catégorie est probablement liée à un projet.")
      });
    }
  }

  private showMessage(msg: string) {
    this.statusMessage = msg;
    setTimeout(() => this.statusMessage = '', 3000);
  }
}