import { Document } from "mongoose"


export interface BookDocument extends Document {
    isbn: string,
    title: string,
    author: string,
    publishedYear: number,
    price: number,
    copies: number
}