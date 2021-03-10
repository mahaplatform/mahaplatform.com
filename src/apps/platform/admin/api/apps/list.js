import AppSerializer from '@apps/platform/serializers/app_serializer'
import App from '@apps/maha/models/app'

const listRoute = async (req, res) => {

  const apps = await App.filterFetch({
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'code'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(apps, AppSerializer)

}

export default listRoute
