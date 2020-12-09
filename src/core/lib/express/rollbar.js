import Rollbar from '../../vendor/rollbar'

const rollbar = (req, res, next) => {

  Rollbar.configure({
    payload: null
  })

  try {

    Rollbar.configure({
      payload: {
        request: {
          headers: req.headers,
          params: req.params,
          method: req.method,
          query: req.query,
          body: req.body,
          url: req.url
        }
      }
    })

  } catch(e) {}

  next()

}

export default rollbar
