import { encoded, translations } from "./data.js";
import decode from "./utils/decode.js";

console.log("Let's rock");
console.log(encoded, translations);

const decoded = decode(encoded, translations);
console.log(decoded);
