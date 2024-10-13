import express from 'express'
import { connectDB } from '../config/database.config'
import { BookRouter } from './routers/book.router'

//init express app
const app = express()
app.use(express.json())

//connect to mongo cloud database
connectDB()

app.get("/", async (req, res) => {
    res.send("Welcome to the LIbrary")
})

app.use("/books", BookRouter)



//launch server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})

