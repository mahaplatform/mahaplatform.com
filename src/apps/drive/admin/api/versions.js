import VersionSerializer from '../../serializers/version_serializer'
import Version from '../../models/version'
import { Resources } from 'maha'

const defaultQuery = (req, trx, qb, options) => {

  qb.where({ file_id: req.params.file_id })

}

const versionsResources = new Resources({
  defaultQuery,
  model: Version,
  path: '/files/:file_id/versions',
  serializer: VersionSerializer,
  withRelated: ['asset']
})

export default versionsResources
