export const throwError = (message: string | unknown) => {
  throw new Error(message as string);
};
