const express = require("express")
const router = express.Router()

const userRoutes = require("./users.routes")
const postRoutes = require("./posts.routes")
const commentRoutes = require("./comments.routes")

router.use("/users", userRoutes)
router.use("/posts", postRoutes)
router.use("/comments", commentRoutes)

module.exports = router
