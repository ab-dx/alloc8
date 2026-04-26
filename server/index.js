import express from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fresherRoutes from "./routes/fresherRoutes.js";
import nonfresherRoutes from "./routes/nonfresherRoutes.js";
import smpRoutes from "./routes/smpRoutes.js";
// const fresherRoutes = require('./routes/fresherRoutes');
// const nonfresherRoutes = require('./routes/nonfresherRoutes');
/* TODO: figure out if/how to import this instead of require - pranjal */
import { expressjwt as jwt } from "express-jwt";
import jwkToPem from "jwk-to-pem";
import path from "path";
const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

const app = express();

// Middleware

app.use(cors({ origin: ["https://alloc8.in", "https://mock.alloc8.in", "https://piedras.alloc8.in", "https://bihta.alloc8.in", "http://localhost:5173"] }));
app.set("pems", []);
fetch(
    "https://login.microsoftonline.com/a57f7d92-038e-4d4c-8265-7cd2beb33b34/discovery/v2.0/keys"
)
    .then((response) => response.json())
    .then((jwks) => jwks.keys)
    .then((keys) => {
        app.locals.keys = keys
        app.set("keys", keys);
        keys.forEach((jwk) => {
            let pems = app.get("pems");
            pems.push(jwkToPem(jwk));
            app.set("pems", pems);
            app.locals.pems = pems
        });
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('hi'))
// app.use("/api/fresher", fresherRoutes);
app.use("/api/nonfresher", nonfresherRoutes);
app.use("/api/smp", smpRoutes);
const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
    console.log("Connected to Backend on Port", PORT);
});
