import { App, BackframeError, Route } from 'maha'

const activity = (req, trx, object, options) => ({
  story: 'updated settings for {object}',
  object
})

const processor = async (req, trx, options) => {

  if(!req.apps[req.params.code]) {
    throw new BackframeError({
      code: 404,
      message: 'Unable to find app'
    })
  }

  await options.knex('maha_installations').transacting(trx).where({
    app_id: req.apps[req.params.code].id
  }).update({
    settings: req.body.settings
  })

  const app = await App.where({
    id: req.apps.expenses.id
  }).fetch({ transacting: trx })

  return app

}

const updateRoute = new Route({
  activity,
  method: 'patch',
  path: '',
  processor
})

export default updateRoute
