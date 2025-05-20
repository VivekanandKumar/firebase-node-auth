import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
    console.info("Database Connection Successfully.");
});

mongoose.connection.on("error", () => {
    console.info("Error in Database Connection.");
});

export default mongoose.connect(process.env.DB_URL);
