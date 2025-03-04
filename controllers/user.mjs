import { randomUUID } from 'crypto';
import { User } from '../models/User.js';

export const signUp = async (req, res) => {
    const { email, password, isAdmin, name, surname } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const id = Math.random() * 10000000000000;

        const newUser = new User({ email, password, isAdmin, id, card: [], wishlist: [], name, surname });
        await newUser.save();
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Sign-in successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const signInAsAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (!user.isAdmin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Sign-in successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addToCard = async (req, res) => {
    const { id, product } = req.body;

    if (!id || !product) {
        return res.status(400).json({ message: 'User ID and product are required' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { id },
            { $addToSet: { card: product } },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Product added to card', user });
    } catch (error) {
        console.error('Error adding product to card:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const addToWishlist = async (req, res) => {
    const { id, product } = req.body;

    if (!id || !product) {
        return res.status(400).json({ message: 'User ID and product are required' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { id },
            { $addToSet: { wishlist: product } },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Product added to wishlist', user });
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const removeFromCard = async (req, res) => {
    const { id, product } = req.body;

    if (!id || !product) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { id },
            { $pull: { card: { id: product.id } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Product removed from card', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const removeFromWishlist = async (req, res) => {
    const { id, product } = req.body;

    if (!id || !product) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { id },
            { $pull: { wishlist: { id: product.id } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Product removed from wishlist', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const GetWishList = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}; 

export const GetCard = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ card: user.card });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
