import { createHash } from "crypto";

export const hashSourceCode = (sourceCode) => createHash("sha256").update(sourceCode).digest("hex");