import express, { Express, Request, Response} from "express";

// Initiate express app
const app: Express = express();

// Used express build in parser for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health Checker Endpoint
app.get("/health", (req: Request, res: Response) => res.send("Healthy"));

export default app;