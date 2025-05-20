import express from "express";
import UserRoutes from "./routes/UserRoutes.js";
import { GlobalErrorHandler } from "./middlewares/ErrorHandler.js";
import connection from "./database/connection.js";
const app = express();

// invoking middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routings
app.use("/user", UserRoutes);

// Global Error handler middleware
app.use(GlobalErrorHandler);

const _PORT = process.env.PORT || 8080;
app.listen(_PORT, async () => {
    // Database Connection
    await connection;
    console.log("Server started on PORT " + _PORT);
});
