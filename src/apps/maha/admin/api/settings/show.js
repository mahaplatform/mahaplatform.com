import { BackframeError, Route } from 'maha'

const processor = async (req, trx, options) => {

  if(!req.apps[req.params.code]) {
    throw new BackframeError({
      code: 404,
      message: 'Unable to find app'
    })
  }

  const app = req.apps[req.params.code]

  const settings = app ? app.settings : {}

  return { settings }

}

const showRoute = new Route({
  method: 'get',
  path: '',
  processor
})

export default showRoute
