import { LoginFirebase } from './login';
import { FBUsers } from './users';
import { FBMatches } from "./match";
import { FBUserBusFactory } from "./user_bus";

export * from './login';
export * from './users';
export * from './match';
export * from './user_bus';

export const FIREBASE_DOMAIN_PROVIDERS = [
  LoginFirebase,
  FBUsers,
  FBMatches,
  FBUserBusFactory
];
