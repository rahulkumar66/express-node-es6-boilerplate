const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const { login } = require('../../validations/auth.validation');

const router = express.Router();

/**
 * @api {post} /api/v1/auth/login Login
 * @apiDescription Get an accessToken
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}         email     User's email
 * @apiParam  {String{..128}}  password  User's password
 *
 * @apiSuccess  {String}  token.accessToken   Authorization Token
 *
 * @apiSuccess  {String}  user.id             User's id
 * @apiSuccess  {String}  user.email          User's email
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
 */
router.route('/login')
    .post(validate(login), controller.login);


module.exports = router;
