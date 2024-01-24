const passport = require('passport');
const User = require('../database/Schemas/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    if (profile._json.hd === 'fpt.edu.vn') {
                        user = new User({
                            googleId: profile.id,
                            email: profile._json.email,
                            photoUrl: profile._json.picture,
                            fullName: profile._json.name,
                        });
                        await User.create(user);
                    } else done(user, null);
                }
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        },
    ),
);

passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, { id: user.id, email: user.email });
    });
});

passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});
