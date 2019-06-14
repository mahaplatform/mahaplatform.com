import { activity } from '../../../../../core/services/routes/activities'
import knex from '../../../../../core/services/knex'
import App from '../../../../maha/models/app'

const showRoute = async (req, res) => {

  if(!req.apps[req.params.code]) return res.status(404).respond({
    code: 404,
    message: 'Unable to find app'
  })

  await knex('maha_installations').transacting(req.trx).where({
    app_id: req.apps[req.params.code].id
  }).update({
    settings: req.body.settings
  })

  const app = await App.where({
    id: req.apps.expenses.id
  }).fetch({
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated settings for {object}',
    object: app
  })

  res.status(200).respond(app)

}

export default showRoute
