const express = require("express")
const router = express.Router()
const commentController = require("../controllers/comments.controllers.js")

router.post("/", commentController.createComment)
router.get("/", commentController.getComments)
router.get("/:id", commentController.getCommentById)
router.delete("/:id", commentController.deleteComment)

module.exports = router
