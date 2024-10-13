import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { BookService } from "../services/book.service";
import { AddBookPayload } from "../payloads/add-book.payload";
import { EditBookPayload } from "../payloads/edit-book.payload";


export const BookRouter = Router()
const bookController = new BookController(new BookService())


//get all books
BookRouter.get("/", async (req, res) => {
    res.status(200).json(await bookController.getBooks())
})

//get book by isbn
BookRouter.get("/:isbn", async (req, res) => {
    const { isbn } = req.params
    const result = await bookController.getBook(isbn) 
    res.status(result.code).json(result.data)
})

//delete book
BookRouter.delete("/:isbn", async (req, res) => {
    const { isbn } = req.params
    const result = await bookController.removeBook(isbn) 

    res.status(result.code).json({})
})

//edit book 
BookRouter.patch("/:isbn", async (req, res) => {
    const { isbn } = req.params
    const editBookPayload: EditBookPayload = req.body
    const result = await bookController.editBook(isbn, editBookPayload)

    res.status(result.code).json(result.data)
})


//add a new book
BookRouter.post("/", async (req, res) => {
    const addBookPayload: AddBookPayload = req.body
    const result = await bookController.addBook(addBookPayload)

    res.status(result.code).json(result.data)
})

