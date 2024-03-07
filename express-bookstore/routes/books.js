const express = require("express");
const router = new express.Router();
const Book = require("../models/book");
const validate = require("jsonschema").validate;
const books = require("../schemas/books.json");

/** GET / => {books: [book, ...]} */
router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
}
);
/** POST / {bookData}  => {book: newBook} */
router.post("/", async function (req, res, next) {
  try {
    const result = validate(req.body, books);
    if (!result.valid) {
      const errorList = result.errors.map(e => e.stack);
      const error = new ExpressError(errorList, 400);
      return next(error);
    }
    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
}
);

/** PUT /[isbn] {bookData} => {book: updatedBook} */
router.put("/:isbn", async function (req, res, next) {
  try {
    if ("isbn" in req.body) {
      return next({ status: 400, message: "Not allowed" });
    }
    const result = validate(req.body, books);
    if (!result.valid) {
      const errorList = result.errors.map(e => e.stack);
      const error = new ExpressError(errorList, 400);
      return next(error);
    }
    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
}
  /** DELETE /[isbn]  => {message: "Book deleted"} */
  router.delete("/:isbn", async function (req, res, next) {
    try {
      await Book.remove(req.params.isbn);
      return res.json({ message: "Book deleted" });
    } catch (err) {
      return next(err);
    }
  }
  );

  module.exports = router;
