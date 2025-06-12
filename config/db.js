import mongoose from "mongoose";

import { MONGO_URI } from "./appConfig.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error("The error is", error);
    process.exit(1);
  }
};

export default connectToDatabase;
