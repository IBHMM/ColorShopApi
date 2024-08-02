import mongoose from 'mongoose';
const { Schema } = mongoose;

const Products = new Schema({
    title: Schema.Types.String,
    price: Schema.Types.Number,
    image: Schema.Types.String,
    category: Schema.Types.String,
    discount: Schema.Types.Number,
    id: Schema.Types.Number,
})

export const Product = mongoose.model('Product', Products);