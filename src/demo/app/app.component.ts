import { Component } from '@angular/core';
import { AppState } from './app.service';

@Component({
  selector: 'app',
  template: `
      <main>
          <div fxLayout="column" fxFill>
              <div fxFlex="nogrow">
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
              </div>
              <div fxFlex>
                  <router-outlet></router-outlet>
              </div>
          </div>
      </main>`
})
export class AppComponent {
  loading = false;
  name = 'Angular Chess';

  constructor(
    public appState: AppState) {

  }
}
