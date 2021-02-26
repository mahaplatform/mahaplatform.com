import VersionSerializer from '@apps/maha/serializers/version_serializer'
import Version from '@apps/maha/models/version'

const currentRoute = async (req, res) => {

  const { versionable_type, versionable_id, key } = req.params

  const version = await Version.query(qb => {
    qb.where('versionable_type', versionable_type)
    qb.where('versionable_id', versionable_id)
    qb.where('key', key)
    qb.orderBy('created_at', 'desc')
  }).fetch({
    withRelated: ['user'],
    transacting: req.trx
  })

  res.status(200).respond(version, VersionSerializer)

}

export default currentRoute
