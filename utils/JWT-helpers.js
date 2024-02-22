const jwt = require('jsonwebtoken');
const User = require('../database/Schemas/User');
const Token = require('../database/Schemas/Token');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const opts = {};
(opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()),
    (opts.secretOrKey = process.env.ACCESS_TOKEN_PRIVATE_KEY);

const signToken = async (payload) => {
    try {
        const accessToken = jwt.sign(
            { accessToken: payload, iat: Math.floor(Date.now() / 1000 - 30) },
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: '1h' },
        );
        const refreshToken = jwt.sign(
            { refreshToken: payload, iat: Math.floor(Date.now() / 1000 - 30) },
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: '30d' },
        );
        const userToken = await Token.findOne({ userId: payload });
        if (userToken) await Token.findOneAndDelete({ userId: payload });
        await new Token({ userId: payload, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
};

const JwtStrategy = new JWTStrategy(opts, async function (jwt_payload, done) {
    try {
        console.log(jwt_payload.accessToken);
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
const RefreshJwtStrategy = new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    },
    async function (jwt_payload, done) {
        try {
            const userToken = await Token.findOne({
                userId: jwt_payload.refreshToken,
            });
            if (userToken && userToken.token === jwt_payload.refreshToken) {
                return done(null, true);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    },
);

async function renewAccessToken(refreshToken) {
    try {
        // Verify the refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
        );

        // Check if the refresh token is valid
        const userToken = await UserToken.findOne({ userId: decoded.token });
        if (!userToken || userToken.token !== refreshToken) {
            throw new Error('Invalid refresh token');
        }

        // Generate a new access token
        const accessToken = jwt.sign(
            { token: decoded.token, iat: Math.floor(Date.now() / 1000 - 30) },
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: '1h' },
        );

        // Return the new access token
        return accessToken;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signToken,
    JwtStrategy,
    RefreshJwtStrategy,
    renewAccessToken,
};
