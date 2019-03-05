import Rollbar from '../../services/rollbar'

const rollbar = (req, res, next) => {

  Rollbar.configure({
    payload: null
  })

  Rollbar.configure({
    payload: {
      request: {
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body,
        url: req.url
      }
    }
  })

  next()

}

export default rollbar
