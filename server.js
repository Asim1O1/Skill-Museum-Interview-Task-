import express from "express";
import { PORT } from "./config/appConfig.js";
import connectToDatabase from "./config/db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Health check successful");
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  } catch (error) {
    console.log("The error is", error);
    process.exit(1);
  }
};

startServer();
