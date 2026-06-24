import express from "express";
import cors from "cors";
import codeInfoRouter from "./routes/route-code-info.js";
import versionInfoRouter from "./routes/route-version-info.js";
import generateJWT from "./utils/generate-jwt.js";
import authenticationRouter from "./routes/route-authenticate.js"
import dashboardRouter from "./routes/route-dashboard.js"

export const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["PUT", "GET", "OPTIONS", "DELETE", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/api/code", codeInfoRouter);
app.use("/api/version", versionInfoRouter);
app.use("/api/authenticate", authenticationRouter)
app.use("/api/dashboard", dashboardRouter)

app.listen(process.env.PORT, () => {
    console.log("SERVER IS RUNNING");
})

