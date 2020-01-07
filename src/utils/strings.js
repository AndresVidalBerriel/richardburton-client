import { SHA3 } from "sha3";

export function removeWhitespaceExcess(string) {
    return string.replace(/\s+/g, " ").trim();
}

export function getHash(string) {
    const hash = new SHA3(512);
    hash.update(string);
    return hash.digest("hex");
}
