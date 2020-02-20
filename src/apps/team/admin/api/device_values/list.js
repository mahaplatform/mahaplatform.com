import DeviceValue from '../../../../maha/models/device_value'
import DeviceValueSerializer from '../../../serializers/device_value_serializer'
import pluralize from 'pluralize'

const listRoute = async (req, res) => {

  const values = await DeviceValue.filter({
    scope: (qb) => {
      qb.where('type', pluralize.singular(req.params.type))
    },
    filter: req.query.$filter,
    filterParams: ['text'],
    searchParams: ['text'],
    sort: req.query.$sort,
    defaultSort: 'text',
    sortParams: ['text']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(values, DeviceValueSerializer)

}

export default listRoute
