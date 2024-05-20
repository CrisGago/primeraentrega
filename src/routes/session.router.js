import { Router } from "express";
import { userManager } from "../dao/userManager.js";
import passport from "../config/passport.js";

const router = Router();
const SessionService = new userManager();

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const result = await SessionService.register(req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Inicio de sesión (POST)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await SessionService.login(email, password);
        res.cookie("auth", token, { maxAge: 60 * 60 * 1000 }).json({
            status: 'success',
            token
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta protegida para obtener el usuario actual
router.get('/current', passport.authenticate("jwt", { session: false }), async (req, res) => {
    res.send({
        user: req.user
    });
});

// Ruta para obtener un usuario por su ID (requiere autenticación y privilegios de administrador)
router.get('/:uid', passport.authenticate("jwt", { session: false }), (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        res.status(403).send({
            status: "error",
            message: "Unauthorized"
        });
    }
}, async (req, res) => {
    try {
        const result = await SessionService.getUser(req.params.uid);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.error("Error al traer usuarios:", error.message);
        res.status(500).send({ error: "Error al traer los usuarios" });
    }
});

export default router;
