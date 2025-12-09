const express = require("express");
const addreview = require("../controllers/Review/addReview"); //  Corrige l'import
const getReviewsByBook = require("../controllers/Review/getReviewsByBook");
const getReviewsByUser = require ("../controllers/Review/getReviewsByUser");
const updateReview = require("../controllers/Review/updateReview");
const deleteReview = require ("../controllers/Review/deleteReview .js")

const router = express.Router();

//  Route pour ajouter une critique
router.post("/reviews/:bookId", addreview.addReview);
router.get("/reviews/book/:bookId", getReviewsByBook.getReviewsByBook);
router.get("/reviews/user/:userId", getReviewsByUser.getReviewsByUser);
router.put("/reviews/:id", updateReview.updateReview);
router.delete("/reviews/:id", deleteReview.deleteReview);


module.exports = router;
