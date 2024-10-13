import { Book } from "../models/Book";
import { AddBookPayload } from "../payloads/add-book.payload";
import { EditBookPayload } from "../payloads/edit-book.payload";
import { AddBookResponse } from "../responses/add-book.response";


export class BookService {

    constructor(){}

    public async getBooks() {
        return await Book.getAll()
    }

    public async getBook(isbn: string) {
        return await Book.get(isbn)
    }

    public async addBook(addBookPayload: AddBookPayload) {
        return await Book.create(addBookPayload) as AddBookResponse
    }

    public async removeBook(isbn: string) {
        return await Book.delete(isbn)
    }

    public async editBook(isbn: string, editBookPayload: EditBookPayload) {
        return await Book.edit(isbn, editBookPayload)
    }
}