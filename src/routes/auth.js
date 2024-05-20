// routes/auth.js
import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/authUtil.js";
import userModel from "../dao/models/userModel.js";
import { isValidPassword } from "../utils/cryptoUtil.js";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !isValidPassword(user, password)) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    //const token = generateToken(user);
    //res.json({ token });
    const token = generateToken(user);
    res.cookie("auth", token, { maxAge: 60 * 60 * 1000 }).json({
        status: 'success',
        token
    });
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Ruta protegida accesible solo con un token válido' });
});

export default router;
