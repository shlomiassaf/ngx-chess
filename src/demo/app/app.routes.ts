import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { GameComponent } from './game';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: '**', component: HomeComponent }
];
