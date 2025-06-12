import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const createBook = async (req, res) => {
  console.log("req.body is", req.body);
  const { title, author, published_date, price } = req.body;
  try {
    if (!title || !author || !published_date || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = await Book.create({ title, author, published_date, price });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("The error is ", error);
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const booksWithAvgRating = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ book: book._id });
        const avgRating = // calculating the average rating of the book
          reviews.length > 0
            ? (
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              ).toFixed(2)
            : null;

        return {
          ...book.toObject(),
          average_rating: avgRating,
        };
      })
    );

    res.status(200).json(booksWithAvgRating);
  } catch (error) {
    console.error("The error is", error);
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const reviews = await Review.find({ book: bookId });

    res.status(200).json({
      ...book.toObject(),
      reviews,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: error.message });
  }
};
