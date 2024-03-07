const jwt = require("jsonwebtoken");
const User = require("../database/Schemas/User");
const Token = require("../database/Schemas/Token");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const { RefreshTokenExpired, InvalidTokenError } = require("../errors/errors");

const opts = {};
(opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()),
  (opts.secretOrKey = process.env.ACCESS_TOKEN_PRIVATE_KEY);

const signToken = async (payload) => {
  try {
    const accessToken = jwt.sign(
      { accessToken: payload, iat: Math.floor(Date.now() / 1000 - 30) },
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "1h", subject: payload.toString() }
    );
    const refreshToken = jwt.sign(
      { refreshToken: payload, iat: Math.floor(Date.now() / 1000 - 30) },
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d", subject: payload.toString() }
    );
    const userToken = await Token.findOne({ userId: payload });
    if (userToken) {
      await Token.findOneAndUpdate(
        { userId: payload },
        { token: refreshToken }
      );
    } else {
      await Token.create({ userId: payload, token: refreshToken });
    }

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

const JwtStrategy = new JWTStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await User.findById(jwt_payload.accessToken);

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
  }
);

async function refreshToken(accessToken, refreshToken) {
  try {
    const decoded = jwt.decode(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    // Verify if access token is expired
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      const refreshTokenExist = await Token.findOne({
        token: refreshToken,
      });
      const userToken = await Token.findOne({
        userId: decoded.sub,
      });
      if (refreshTokenExist && userToken) {
        const decodedRefreshToken = jwt.decode(
          refreshTokenExist.token,
          process.env.REFRESH_TOKEN_PRIVATE_KEY
        );
        if (decodedRefreshToken.exp <= Math.floor(Date.now() / 1000)) {
          throw new RefreshTokenExpired("Please sign in again");
        }
        const newAccessToken = (await signToken(userToken.userId)).accessToken;
        return newAccessToken;
      } else {
        throw new InvalidTokenError("Unauthorized");
      }
    } else {
      // Access token is not expired, return the same token
      return accessToken;
    }
  } catch (error) {
    throw error; // Rethrow the error for the caller to handle
  }
}

module.exports = {
  signToken,
  JwtStrategy,
  RefreshJwtStrategy,
  refreshToken,
};
