const jwt = require('jsonwebtoken');
const User = require('../database/Schemas/User');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const opts = {};
(opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()),
    (opts.secretOrKey = process.env.PRIVATE_KEY);

const signToken = async (payload) => {
    var token = await jwt.sign(
        { token: payload, iat: Math.floor(Date.now() / 1000 - 30) },
        process.env.PRIVATE_KEY,
        { expiresIn: '1m' },
    );
    console.log(token);
    return token;
};

const JwtStrategy = new JWTStrategy(opts, async function (jwt_payload, done) {
    try {
        console.log(jwt_payload.token);
        const user = await User.findById(jwt_payload.token);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
});

// try {
//     const decodedContent = await jwt.verify(token, process.env.PRIVATE_KEY);
//     console.log(decodedContent.id);
//     return decodedContent.id;
// } catch (error) {
//     return new Error('Invalid token');
// }

module.exports = { signToken, JwtStrategy };
