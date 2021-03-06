import AppSerializer from '@apps/team/serializers/app_serializer'
import App from '@apps/maha/models/app'

const showRoute = async (req, res) => {

  const app = await App.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!app) return res.status(404).respond({
    code: 404,
    message: 'Unable to load app'
  })

  await res.status(200).respond(app, AppSerializer)

}

export default showRoute
