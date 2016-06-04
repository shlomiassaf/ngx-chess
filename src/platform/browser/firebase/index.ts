import {
  FIREBASE_PROVIDERS as ORG_FIREBASE_PROVIDERS,
  defaultFirebase
} from 'angularfire2';


export const FIREBASE_PROVIDERS = [
  ORG_FIREBASE_PROVIDERS,
  defaultFirebase('https://angular2-chess.firebaseio.com')
];
