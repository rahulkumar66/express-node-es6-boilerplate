const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('./vars');

const jwtOptions = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = (payload, done) => {
    try {
        const user = { email: payload.sub };
        if (user) { return done(null, user); }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
};
exports.jwt = new JwtStrategy(jwtOptions, jwt);
