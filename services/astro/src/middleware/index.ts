import { defineMiddleware, sequence } from "astro/middleware";

export const validate = defineMiddleware(async (_, next) => {
  console.log("validating");
  return next();
});

export const context = defineMiddleware(async (_, next) => {
  console.log("providing context data");
  return next();
});

export const onRequest = sequence(validate, context);
