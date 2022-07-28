import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    console.log("BearerToken Before spliting------->", bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    console.log("BearerToken After spliting------->", bearerToken);
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    console.log("User Credentials", user);
    req.body.UserID = user.email;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: `${error}`
    });
  }
};

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const resetAuth = async (req, res, next) => {
  try {
    let bearerToken = req.params.token;
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };

      console.log("BearerToken After spliting------->", bearerToken);
      const user = await jwt.verify(bearerToken, process.env.FORGOT_KEY);
      console.log("User Credentials", user);
      req.body.email = user.email;
      next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: `${error}`
    });
  }
};
