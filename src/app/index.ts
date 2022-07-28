import express, { Express, Request, Response} from "express";
import APIV1 from "./v1";

// Initiate express app
const app: Express = express();


// Used express build in parser for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health Checker Endpoint
app.get("/health", (req: Request, res: Response) => res.send("Healthy"));

// Register all controllers
const apiV1: APIV1 = new APIV1();

app.use("/api", apiV1.router);

export default app;