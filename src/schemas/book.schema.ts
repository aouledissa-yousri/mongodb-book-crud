import { Schema } from "mongoose";


export const BookSchema = new Schema ({
    isbn: { type: String, required: true, unique: true},
    title: { type: String, required: true},
    author: { type: String, required: true},
    publishedYear: { type: Number, required: true},
    price: { type: Number, required: true},
    copies: { type: Number, required: true}
})