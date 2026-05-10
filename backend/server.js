import express from "express";
import "dotenv/config";
import cors from "cors";
import pg from "pg"
import saveVersionCodeRouter from "./save-version-db.js";
import saveCodeRouter from "./save-code-db.js";
const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["PUT", "GET", "OPTIONS", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());


const { Pool } = pg;

export const db = new Pool({
    host: process.env.DB_HOST,         // where your database lives, e.g. 'localhost'
    port: process.env.DB_PORT,         // postgres port, default is 5432
    user: process.env.DB_USER,         // your postgres username, e.g. 'postgres'
    password: process.env.DB_PASSWORD, // your postgres password you set during install
    database: process.env.DB_NAME,
});


app.listen(process.env.PORT, () => {
    console.log("SERVER IS RUNNING");
})

app.use("/api/code", saveCodeRouter);
app.use("/api/version", saveVersionCodeRouter);

