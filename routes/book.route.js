import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
} from "../controllers/book.controller.js";

const bookRouter = express.Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);

export default bookRouter;
