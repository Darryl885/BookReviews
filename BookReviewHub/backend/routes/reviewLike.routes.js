const express = require("express");
const router = express.Router();
const addReviewLike = require("../controllers/ReviewLike/addReviewLike");
const countReviewLikes = require ("../controllers/ReviewLike/countReviewLikes")
const removeReviewLike = require("../controllers/ReviewLike/removeReviewLike")

router.post("/reviewlikes", addReviewLike.addReviewLike);
router.get("/reviewlikes/:reviewId", countReviewLikes.countReviewLikes);
router.delete("/reviewlikes", removeReviewLike.removeReviewLike);

module.exports = router;
