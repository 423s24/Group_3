import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import Database from "./config/Database";
import errorHandler from "./middleware/ErrorHandler";

import userRouter from "./routes/userRoutes";
import guestRouter from "./routes/guestRoutes";

/**
 * The main class of the server application.
 */
class Server {
    private app: Application;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.config();
        this.routes();
    }

    /**
     * Starts the server application.
     */
    public start() {
        // The error handler must be the last middleware in the stack to catch all errors that occur in the application.
        this.app.use(errorHandler);
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server running on port ${this.app.get("port")}`);
        });
    }

    /**
     * Configures the server application.
     * @private
     */
    private config() {
        dotenv.config();

        const db: Database = new Database();
        db.connect();

        this.app.set("port", process.env.PORT! || this.port);

        if (process.env.NODE_ENV === "development") {
            this.app.use(morgan("dev"));
        }

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(session({
            secret: process.env.SESSION_SECRET!,
            resave: false,
            saveUninitialized: false,
        }));

        this.app.use(cookieParser());

        this.generateDocsRoutes();
    }

    /**
     * Configures the routes of the server application.
     * @private
     */
    private routes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).json({
                message: "Connected to Warming Shelter API",
                port: this.app.get("port"),
            });
        });

        // Use routes in application
        this.app.use("/api/users", userRouter);
        this.app.use("/api/guests", guestRouter);
    }

    private generateDocsRoutes() {
        if(process.env.NODE_ENV === "production") return;
        
        this.app.use("/docs", express.static("docs"));
        this.app.get("/docs", (req: Request, res: Response) => {
            res.render("index.html");
        });
    }
}

const server = new Server();
server.start();