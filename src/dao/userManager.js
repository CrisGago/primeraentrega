// 
// userManager.js
import jwt from "jsonwebtoken";


import userModel from './models/userModel.js';
import { isValidPassword } from '../utils/cryptoUtil.js';



class userManager {

    async getAllUsers() {
        try {
            return await userModel.find().lean();
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al traer los usuarios');
        }
    }

    async getUser(uid) {
        try {
            return await userModel.findOne({ _id: uid }).lean();
        } catch (error) {
            console.error(error.message);
            throw new Error('El usuario no existe');
        }
    }

    async register(user) {
        const { first_name, last_name, email, age, password } = user;

        if (!first_name || !last_name || !email || !age || !password) {
            throw new Error('Todos los campos son obligatorios para registrar el usuario');
        }

        try {
            await userModel.create({ first_name, last_name, email, age, password });
            return "El Usuario se ha registrado correctamente";
        } catch (error) {
            console.error('Error al registrar el usuario:', error.message);
            throw error;
        }
    }

    async login(email, password) {
        const errorMessage = 'Email y/o password incorrectas';

        if (!email || !password) {
            throw new Error(errorMessage);
        }
        try {
            const user = await userModel.findOne({ email }).lean();

            if (!user) throw new Error(errorMessage);

            if (isValidPassword(user, password)) {
                delete user.password;
                return jwt.sign(user, "your_jwt_secrets", {expiresIn: "1h"});
            }
            throw new Error(errorMessage);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export { userManager };
