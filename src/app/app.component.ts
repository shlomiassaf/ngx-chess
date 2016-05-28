import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { Game } from './game';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <button md-button [routerLink]=" ['Home'] ">
            Home
          </button>
          <button md-button [routerLink]=" ['Game'] ">
            Game
          </button>
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <router-outlet></router-outlet>
      </md-content>
  `
})
@RouteConfig([
  { path: '/home',  name: 'Home',  component: Home, useAsDefault: true },
  { path: '/game',  name: 'Game',  component: Game }
])
export class App {
  loading = false;
  name = 'Angular 2 Chess';

  constructor(
    public appState: AppState) {

  }
}
