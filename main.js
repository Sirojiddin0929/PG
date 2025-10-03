const express = require("express")
const mainRouter = require("./routes/main.routes.js")

const app = express()

app.use(express.json())

app.use("/api", mainRouter)

const PORT = 3000

app.listen(PORT, () => {
  console.log(` Server started on port ${PORT}`)
})
