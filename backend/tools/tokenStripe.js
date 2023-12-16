import { config } from "dotenv";
config();

const { SECRECT_TOKEN } = process.env;

function verifyKey(clave) {
  if (typeof clave === "string") {
    return clave;
  }
}

export const claveSecreta = verifyKey(SECRECT_TOKEN);