import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(12).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`,
    });
  } else {
    req.validateBody = value;
    next();
  }
};

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().required(),
    Descreption: Joi.string().required(),
    color: Joi.string().optional(),
    Label: Joi.string().optional(),
    isArchived: Joi.string().optional(),
    isDeleted: Joi.string().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`,
    });
  } else {
    // req.validatedBody = value;
    next();
  }
};

export const labelValidator = (req, res, next) => {
  const schema = Joi.object({
    label: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`,
    });
  } else {
    // req.validatedBody = value;
    next();
  }
};