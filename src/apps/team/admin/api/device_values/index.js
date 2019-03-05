import { Segment, Resources, DeviceValue } from 'maha'
import pluralize from 'pluralize'

const DeviceValueSerializer = (req, trx, result) => ({
  id: result.get('id'),
  text: result.get('text')
})

const deviceValueResources = (type) => new Resources({
  defaultQuery: (req, trx, qb, options) => qb.where({ type }),
  filterParams: ['type'],
  model: DeviceValue,
  only: ['list'],
  ownedByTeam: false,
  path: `/${pluralize(type)}`,
  serializer: DeviceValueSerializer,
  sortParams: ['text']
})

const deviceValueSegment = new Segment({
  path: '/device_values',
  routes: [
    deviceValueResources('device_type'),
    deviceValueResources('os_name'),
    deviceValueResources('browser_name')
  ]
})

export default deviceValueSegment
