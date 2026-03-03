import { Component, inject, OnInit, OnDestroy } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private authSub?: Subscription;

  isMenuOpen = false;
  // On initialise avec la valeur actuelle du service
  isLoggedIn = false; 

  ngOnInit() {
    // On s'abonne au flux d'authentification
    // Dès que le service fait .next(true), cette variable change ici !
    this.authSub = this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.authService.logout();
    this.isMenuOpen = false;
    this.router.navigate(['/login']); 
  }

  ngOnDestroy() {
    // BONNE PRATIQUE : On libère la mémoire
    this.authSub?.unsubscribe();
  }
}