import { Component } from '@angular/core';
import { AppState } from './app.service';

@Component({
  selector: 'app',
  template: `
      <main>
          <md-toolbar color="primary">
              <span>{{ name }}</span>
              <span class="fill"></span>
              <button md-button [routerLink]=" ['./home'] ">
                  Home
              </button>
              <button md-button [routerLink]=" ['./game'] ">
                  Game
              </button>
          </md-toolbar>

          <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

          <router-outlet></router-outlet>
      </main>`
})
export class AppComponent {
  loading = false;
  name = 'Angular Chess';

  constructor(
    public appState: AppState) {

  }
}
