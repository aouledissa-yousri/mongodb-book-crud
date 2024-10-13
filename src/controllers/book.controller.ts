import { AddBookPayload } from "../payloads/add-book.payload";
import { EditBookPayload } from "../payloads/edit-book.payload";
import { BookService } from "../services/book.service";


export class BookController {

    constructor(
        private bookService: BookService
    ){}

    public async getBooks() {
        return await this.bookService.getBooks()
    }

    public async getBook(isbn: string) {
        const book = await this.bookService.getBook(isbn)
        if(book.isbn === undefined) return {code: 404}
        return {code: 200, data: book}
    }


    public async addBook(addBookPayload: AddBookPayload) {
        const bookRecord = await this.bookService.getBook(addBookPayload.isbn)
        if(bookRecord.isbn !== undefined) return {code: 409}

        return { code: 201, data: await this.bookService.addBook(addBookPayload)}
    }

    public async removeBook(isbn: string) {
        const bookRecord = await this.bookService.getBook(isbn)
        if(bookRecord.isbn === undefined) return {code: 404}

        await this.bookService.removeBook(isbn)
        return {code: 200}
    }

    public async editBook(isbn: string, editBookPayload: EditBookPayload) {
        const bookRecord = await this.bookService.getBook(isbn)
        if(bookRecord.isbn === undefined) return {code: 404}

        return {code: 200, data: await this.bookService.editBook(isbn, editBookPayload)}
    }
}