import DeviceValue from '../../../../maha/models/device_value'
import DeviceValueSerializer from '../../../serializers/device_value_serializer'
import pluralize from 'pluralize'

const listRoute = async (req, res) => {

  const values = await DeviceValue.query(qb => {
    qb.where('type', pluralize.singular(req.params.type))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['text'],
    searchParams: ['text']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'text',
    sortParams: ['text']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(values, (value) => {
    return DeviceValueSerializer(req, value)
  })

}

export default listRoute
