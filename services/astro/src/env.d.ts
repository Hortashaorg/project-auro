/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    loggedIn: boolean;
    account?: {
      id: string;
      email: string;
    };
    server?: {
      id: string;
    };
    user?: {
      id: string;
    };
  }
}
