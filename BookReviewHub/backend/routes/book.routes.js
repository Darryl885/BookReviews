const express = require("express");
const  createBook  = require("../controllers/Book/createBook");
const getAllBooks = require("../controllers/Book/getAllBooks")
const getBookById  = require("../controllers/Book/getBookById")
const updateBook = require("../controllers/Book/updateBook")
const deleteBook = require("../controllers/Book/deleteBook")

const router = express.Router();

router.post("/books", createBook.createBook); //  Crée un livre
router.get("/books", getAllBooks.getAllBooks); //  Récupérer tous les livres
router.get("/books/:id", getBookById.getBookById);// Récupérer un livre par son ID
router.put("/books/:id", updateBook.updateBook); //  Modifier un livre
router.delete("/books/:id", deleteBook.deleteBook);

module.exports = router;
