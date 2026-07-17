import express from "express";
import cors from "cors";
import codeInfoRouter from "./routes/route-code-info.js";
import versionInfoRouter from "./routes/route-version-info.js";
import generateJWT from "./utils/generate-jwt.js";
import authenticationRouter from "./routes/route-authenticate.js"
import libraryRouter from "./routes/route-library.js"
import cookieParser from "cookie-parser";
import verifyJWT from "./middlewares/verifiy-jwt.js";
import attachNewAccessToken from "./middlewares/attach-new-access-token.js";
import { getAllFolders } from "./services/service-library.js";

export const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["PUT", "GET", "OPTIONS", "DELETE", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser()); // parsing http only cookies
app.use("/api/code", codeInfoRouter);
app.use("/api/version", versionInfoRouter);
app.use("/api/authenticate", authenticationRouter)
app.use("/api/library", verifyJWT, attachNewAccessToken, libraryRouter)


app.listen(process.env.PORT, () => {
    console.log("SERVER IS RUNNING");
})
