import { createHash } from "crypto";


export const hash_code = (source_code) => createHash("sha256").update(source_code).digest("hex");