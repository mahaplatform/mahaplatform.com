import DeviceValue from '../../../../maha/models/device_value'
import DeviceValueSerializer from '../../../serializers/device_value_serializer'
import pluralize from 'pluralize'

const listRoute = async (req, res) => {

  const values = await DeviceValue.filterFetch({
    scope: (qb) => {
      qb.where('type', pluralize.singular(req.params.type))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['text'],
      search: ['text']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'text',
      allowed: ['text']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(values, DeviceValueSerializer)

}

export default listRoute
