/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    loggedIn: boolean;
    account?: {
      id: string;
      email: string;
      accessTokenHash: string | null;
      accessTokenExpires: Date | null;
      refreshTokenHash: string | null;
      refreshTokenExpires: Date | null;
    };
    server?: {
      id: string;
    };
    user?: {
      id: string;
    };
  }
}
