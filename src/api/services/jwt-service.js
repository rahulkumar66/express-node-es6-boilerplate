const jwt = require('jwt-simple');
const { jwtSecret } = require('../../config/vars');

module.exports = {
    /**
     * Returns a valid jwt token
     * @public
     */
    createToken: (user) => {
        const payload = {
            expiresIn: '24h',
            sub: user.email,
        };
        return jwt.encode(payload, jwtSecret);
    }
};
