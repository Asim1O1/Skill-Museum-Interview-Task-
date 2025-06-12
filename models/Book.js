import mongoose from Mongoose;


const bookSchema = new mongoose.schema({
    title:{
      type: String,
      required: true,
      trim: true
    },
    author:{
      type: String,
      required: true,
      trim: true
    },
    published_date: {
    type: Date,
    required: true,
  },
  Price:{
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, )

const Book = mongoose.model("Book", bookSchema);

export default Book
