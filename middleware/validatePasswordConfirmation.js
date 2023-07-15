import { check, validationResult } from 'express-validator';

const validatePasswordConfirmation = (req, res, next) => {
    const { password, passwordconfirmation } = req.body;
  
    if (password !== passwordconfirmation) {
      const error = {
        msg: 'Password and password confirmation do not match.',
        param: 'passwordConfirmation',
        location: 'body',
      };
  
      return res.status(400).json({ errors: [error] });
    }
  
    next();
  };

  export default validatePasswordConfirmation;