const httpStatus = require('http-status');
const jwtService = require('./../services/jwt-service');
const APIError = require('../utils/APIError');

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
    try {
        const { user, accessToken } = await generateToken(req.body);
        return res.json({ accessToken, ...user });
    } catch (error) {
        return next(error);
    }
};

/**
 * Returns if uses matches and token
 * @private
 */
const generateToken = async (body) => {
    const { email, password } = body;
    // Fetch user from db or other service in this a placeholder
    const user = { email: email, username: email };
    const err = {
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    };
    if (password && password.length > 0) {
        //in this case we authorize any email/password combination
        if (user) {
            return { user, accessToken: jwtService.createToken(user) };
        }
        err.message = 'Incorrect email or password';
    }
    throw new APIError(err);
};
