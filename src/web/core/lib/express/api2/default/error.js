const error = (err, req, res, next) => {

  if(process.env.NODE_ENV === 'development') {
    console.log(err)
  }

  if(err.status) return res.status(err.status).json({
    message: err.message
  })

  if(err.errors) return res.status(422).json({
    message: 'Unable to save record',
    errors: err.toJSON()
  })

  return res.status(500).json({
    message: err.message
  })

}

export default error
