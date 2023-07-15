import { validationResult } from 'express-validator';


const validatorResponse = (req, res, next) => {

     //  return validation Error 
const validationError = validationResult(req).array();

if (validationError.length > 0) {
    const serverRes = {
        message : "Invalid request",
        error : validationError,
    };
    res.status(403).json(serverRes);
    return;
} else {
    next()
}
};

export default validatorResponse;