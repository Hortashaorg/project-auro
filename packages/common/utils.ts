import { decodeJwt } from "jose";

export const throwError = (message: string | unknown) => {
  throw new Error(message as string);
};

export const jwtClaims = <T>(token: string) => {
	return decodeJwt<T>(token);
};
