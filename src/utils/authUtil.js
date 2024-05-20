// utils/authUtil.js
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    };
    return jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }); // 'your_jwt_secret' debe ser una clave secreta segura
};

export { generateToken };
