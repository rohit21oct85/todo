const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
      let error = { ...err }
      error.message = err.message
      if(err.name === 'validationError'){
            const message = Object.values(err.errors).map((val) => val.messgae);
            err = new ErrorResponse(message, 400);
      }
      res.status(error.statusCode || 500).json({
            success: false,
            status: error.statusCode,
            message: error.message || 'Internal Server Error'
      })
}
module.exports = errorHandler;