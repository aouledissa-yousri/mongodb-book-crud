import { model } from "mongoose"
import { BookDocument } from "../documents/book.document"
import { BookSchema } from "../schemas/book.schema"
import { AddBookPayload } from "../payloads/add-book.payload"
import { GetBookResponse } from "../responses/get-book.response"
import { EditBookPayload } from "../payloads/edit-book.payload"


export class Book {

    private static bookSchema = model<BookDocument>('Book', BookSchema)

    constructor(
        private isbn: string,
        private title: string,
        private author: string,
        private publishedYear: number,
        private price: number,
        private copies: number
    ){}


    public getIsbn() {
        return this.isbn
    }

    public getTitle() {
        return this.title
    }

    public getAuthor() {
        return this.author
    }

    public getPublishedYear() {
        return this.publishedYear
    }

    public getPrice() {
        return this.price
    }

    public getCopies() {
        return this.copies
    }




    public setIsbn(isbn: string) {
        this.isbn = isbn
    }

    public setTitle(title: string) {
        this.title = title
    }

    public setAuthor(author: string) {
        this.author = author
    }

    public setPublishedYear(publishedYear: number) {
        this.publishedYear = publishedYear
    }

    public setPrice(price: number) {
        this.price = price
    }

    public setCopies(copies: number) {
        this.copies = copies
    }


    public getData() {
        return {
            isbn: this.getIsbn(),
            title: this.getTitle(),
            author: this.getAuthor(),
            publishedYear: this.getPublishedYear(),
            price: this.getPrice(),
            copies: this.getCopies()
        }
    }

    public saveData() {
        const book = new Book.bookSchema(this.getData())
        book.save()
    }


    public static async create(addBookPayload: AddBookPayload) {
        const book = new Book(addBookPayload.isbn, addBookPayload.title, addBookPayload.author, addBookPayload.publishedYear, addBookPayload.price, addBookPayload.copies)
        book.saveData()
        return book.getData()
    }

    public static async delete(isbn: string) {
        const bookRecord = await Book.bookSchema.findOneAndDelete({isbn})
    }

    public static async edit(isbn: string, editBookPayload: EditBookPayload) {
        const bookRecord = await Book.bookSchema.findOneAndUpdate({isbn}, editBookPayload)
        return await Book.get(isbn)
    }

    public static async getAll() {
        const bookRecords = await Book.bookSchema.find()
        const books = bookRecords.map<GetBookResponse>(bookRecord => {
            return new Book(
                bookRecord.isbn,
                bookRecord.title,
                bookRecord.author,
                bookRecord.publishedYear,
                bookRecord.price,
                bookRecord.copies
            ).getData()
        })

        return books
    }

    public static async get(isbn: string) {
        const bookRecord = await Book.bookSchema.findOne({isbn})

        return new Book(
            bookRecord?.isbn as string,
            bookRecord?.title as string,
            bookRecord?.author as string,
            bookRecord?.publishedYear as number,
            bookRecord?.price as number,
            bookRecord?.copies as number
        ).getData()
    }


    
}