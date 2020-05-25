const error = (error, req, res, next) => {

  res.error = error

  if(error.status) return res.status(error.status).json({
    status: error.status,
    errors: error.errors,
    message: error.message
  })

  if(error.errors) return res.status(422).json({
    status: 422,
    message: 'Unable to save record',
    errors: error.toJSON()
  })

  return res.status(500).json({
    status: 500,
    message: error.message
  })

}

export default error
