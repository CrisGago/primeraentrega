// config/passport.js
import passport from "passport";
import jwt, { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../dao/models/userModel.js";

// Función para extraer el token JWT de las cookies
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.auth ?? null;
    }
    return token;
};

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret' // Debe ser una clave secreta segura
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await userModel.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;
