const error = (err, req, res, next) => {

  console.log(err)

  if(process.env.NODE_ENV === 'development') {
    console.log(err)
  }

  if(err.status) return res.status(err.status).json({
    status: err.status,
    errors: err.errors,
    message: err.message
  })

  if(err.errors) return res.status(422).json({
    status: 422,
    message: 'Unable to save record',
    errors: err.toJSON()
  })

  return res.status(500).json({
    status: 500,
    message: err.message
  })

}

export default error
