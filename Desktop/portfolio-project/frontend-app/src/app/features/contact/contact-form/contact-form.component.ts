import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true, // BONNE PRATIQUE : Plus besoin de NgModules, le composant s'auto-gère.
  imports: [CommonModule, ReactiveFormsModule], // On importe uniquement ce dont on a besoin.
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  /**
   * BONNE PRATIQUE : Utiliser FormGroup pour les formulaires complexes.
   * Cela permet de garder le contrôle total sur la validation côté TypeScript.
   */

  contactForm: FormGroup;
  statusMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService
  ) {
    /**
     * BONNE PRATIQUE : Définir des validations strictes dès le départ.
     * Validators.required empêche l'envoi de champs vides.
     */
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.loading = true; // Feedback visuel pour l'utilisateur
      
      /**
       * BONNE PRATIQUE : S'abonner (subscribe) dans le composant.
       * On traite ici la réponse visuelle (message de succès ou d'erreur).
       */
      this.contactService.sendEmail(this.contactForm.value).subscribe({
        next: (res) => {
          this.statusMessage = 'Message envoyé avec succès !';
          this.contactForm.reset(); // Vider le formulaire après succès
          this.loading = false;
        },
        error: (err) => {
          this.statusMessage = "Erreur lors de l'envoi.";
          this.loading = false;
        }
      });
    }
  }

}
