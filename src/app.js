import express from "express";
import cors from "cors";
import "dotenv/config";
import validateRequest from "./req/validateRequest.js";
import validateUser from "./req/validateUser.js";
import Get from "./methods/get.js";
import Post from "./methods/post.js";
import Put from "./methods/put.js";
import Delete from "./methods/delete.js";

const app = express();
const PORT = process.env.PORT || 5010;
const cb = console.log(`CORS proxy server is running on port ${PORT}`);

app.use(cors());
app.use(express.json());

app.get("/", validateRequest, validateUser, Get);
app.post("/", validateRequest, validateUser, Post);
app.put("/", validateRequest, validateUser, Put);
app.delete("/", validateRequest, validateUser, Delete);

app.listen(PORT, cb);
