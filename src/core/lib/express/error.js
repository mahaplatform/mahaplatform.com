const error = (error, req, res, next) => {

  console.log('here')

  res.error = error

  if(error.errors) return res.status(422).json({
    status: 422,
    message: 'Unable to save record',
    errors: error.toJSON()
  })

  if(error.status) return res.status(error.status).json({
    status: error.status,
    errors: error.errors,
    message: error.message
  })

  return res.status(500).json({
    status: 500,
    message: process.env.NODE_ENV === 'production' ? 'Application Error' : error.message
  })

}

export default error
