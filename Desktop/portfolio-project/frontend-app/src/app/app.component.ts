import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 1. On importe la classe du composant Navbar
import { NavbarComponent } from './shared/components/navbar/navbar.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. On l'ajoute dans le tableau des imports ici
  imports: [RouterOutlet, NavbarComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-frontend';
}