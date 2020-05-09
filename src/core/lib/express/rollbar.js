import Rollbar from '../../services/rollbar'

const rollbar = (req, res, next) => {

  Rollbar.configure({
    payload: null
  })

  try {

    Rollbar.configure({
      payload: {
        person: req.user ? {
          id: req.user.get('id'),
          username: req.user.get('full_name'),
          email: req.user.get('email')
        } : null,
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
