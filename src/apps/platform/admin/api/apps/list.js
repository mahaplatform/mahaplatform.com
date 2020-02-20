import AppSerializer from '../../../serializers/app_serializer'
import App from '../../../../maha/models/app'

const listRoute = async (req, res) => {

  const apps = await App.filterFetch({
    sort: {
      params: req.query.$sort,
      defaults: 'code'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(apps, AppSerializer)

}

export default listRoute
