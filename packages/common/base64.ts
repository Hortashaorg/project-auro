import { throwError } from "./utils";

export const base64 = (str: string | undefined) => {
	const assertString = str ?? throwError("Is undefined");
	return Buffer.from(assertString).toString("base64");
};

export const decodeBase64 = (encodedStr: string | undefined) => {
	const assertEncodedString = encodedStr ?? throwError("Is undefined");
	return Buffer.from(assertEncodedString, "base64").toString("utf8");
};
