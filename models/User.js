import mongoose from 'mongoose';
const { Schema } = mongoose;


const Use_r = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    card: {
        type: Array,
        required: true
    },
    wishlist: {
        type: Array,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true 
    },
    surname: {
        type: String,
        required: true 
    },
    id: {
        type: String,
        unique: true,
        required: true
    }
})

export const User = mongoose.model('User', Use_r);

