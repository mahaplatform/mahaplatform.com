import AppSerializer from '../../../serializers/app_serializer'
import App from '../../../../maha/models/app'

const listRoute = async (req, res) => {

  const apps = await App.sort({
    sort: req.query.$sort,
    defaultSort: 'code'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(apps, (app) => {
    return AppSerializer(req, app)
  })
  
}

export default listRoute
