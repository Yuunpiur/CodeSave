import express from "express";
import cors from "cors";
import anonymousCodeInfoRouter from "./routes/route-anonymous-code-info.js";
import anonymousVersionInfoRouter from "./routes/route-anonymous-version-info.js";
import registeredCodeInfoRouter from "./routes/route-registered-code-info.js";
import registeredVersionInfoRouter from "./routes/route-registered-version-info.js";
import authenticationRouter from "./routes/route-authenticate.js"
import libraryRouter from "./routes/route-library.js"
import cookieParser from "cookie-parser";
import verifyJWT from "./middlewares/verify-jwt.js";
import attachNewAccessToken from "./middlewares/attach-new-access-token.js";


export const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["PUT", "GET", "OPTIONS", "DELETE", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser()); // parsing http only cookies

app.use("/api/anonymous-user-code", anonymousCodeInfoRouter);
app.use("/api/anonymous-user-version", anonymousVersionInfoRouter);

app.use("/api/registered-user-code", registeredCodeInfoRouter);
app.use("/api/registered-user-version", registeredVersionInfoRouter);



app.use("/api/authenticate", authenticationRouter)
app.use("/api/library", verifyJWT, attachNewAccessToken, libraryRouter)


app.listen(process.env.PORT, () => {
    console.log("SERVER IS RUNNING");
})
