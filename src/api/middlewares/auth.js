const httpStatus = require('http-status');
const passport = require('passport');
const { promisify } = require('util');
const APIError = require('../utils/APIError');
const logger = require('../../config/logger');

/**
 * Handle JWT token and authenticate user
 * @private
 */
const handleJWT = (req, res, next) => async (err, user, info) => {
    const error = err || info;
    const logIn = promisify(req.logIn);
    const apiError = new APIError({
        message: error ? error.message : 'Unauthorized',
        status: httpStatus.UNAUTHORIZED,
        stack: error ? error.stack : undefined,
    });

    try {
        if (error || !user) { throw error; }
        logger.info('successfull login');
        await logIn(user, { session: false });
    } catch (e) {
        return next(apiError);
    }

    if (err || !user) {
        logger.error(`Error occured during auth ${err}`);
        return next(apiError);
    }
    req.user = user;

    return next();
};

exports.authorize = () => (req, res, next) =>
    passport.authenticate(
        'jwt', { session: false },
        handleJWT(req, res, next))(req, res, next);
