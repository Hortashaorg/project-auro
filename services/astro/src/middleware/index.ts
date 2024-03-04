import { defineMiddleware, sequence } from "astro/middleware";

export const validate = defineMiddleware(async (context, next) => {
  console.log("validating");
  // Get current access token
  // Hash the tokens
  // Confirm we can find a record with matching tokens

  // Confirm the token is still valid
  return next();
});

export const context = defineMiddleware(async (_, next) => {
  console.log(
    "providing context data about the user to be used in the endpoints",
  );
  // Provide context data about the user that is logged in
  return next();
});

export const tokenRenew = defineMiddleware(async (_, next) => {
  // If access token is about to expire. Do a token renewal
  return next();
});

export const onRequest = sequence(validate, context, tokenRenew);
