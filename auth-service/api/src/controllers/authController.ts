import { Request, Response } from 'express';
import argon2 from 'argon2';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

dotenv.config();

export const registerAUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, role } = req.body;

        // Check for missing fields
        if (!email || !password) {
            res.status(403).json({ message: 'Tous les champs sont requis.' });
            return;
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(403).json({ message: 'Format d\'email invalide.' });
            return;
        }

        // Vérification de l'existence de l'email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            res.status(409).json({ message: 'Cet email existe déjà.' });
            return;
        }

        // Hachage du mot de passe
        const hashedPassword = await argon2.hash(password);

        // Création de l'utilisateur
        const newUser = new User({
            email: email,
            password: hashedPassword,
            role: role 
        });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } 
    catch (error) {
        console.error('Error during user creation:', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(403).json({ message: 'Tous les champs sont requis.' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Identifiants invalides.' });
            return 
        }

        // Vérifiez le mot de passe
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Identifiants invalides.' });
            return 
        }

        const payload = {
            id: user._id,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_KEY as string, { expiresIn: '10h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
};