import "reflect-metadata";

import express from "express";

import {routes} from "./routes/routes"; 

import "./infra/database/postgres";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000);