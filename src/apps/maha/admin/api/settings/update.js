import { activity } from '../../../../../core/services/routes/activities'
import App from '../../../../maha/models/app'

const showRoute = async (req, res) => {

  if(!req.apps[req.params.code]) return res.status(404).respond({
    code: 404,
    message: 'Unable to find app'
  })

  await req.trx('maha_installations')
    .where('app_id', req.apps[req.params.code].id)
    .update({
      settings: req.body.settings
    })

  const app = await App.where({
    id: req.apps.finance.id
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
