import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const { book, reviewer_name, rating, comment } = req.body;
  try {
    // Validation
    if (!book || !reviewer_name || rating == null) {
      return res
        .status(400)
        .json({ message: "Book, reviewer name and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      // book rating must be more than 1 less than or equal to 5
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Check if the book exists
    const existingBook = await Book.findById(book);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = await Review.create({
      book,
      reviewer_name,
      rating,
      comment,
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error("The error is ", error);
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};
