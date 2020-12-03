import VersionSerializer from '@apps/maha/serializers/version_serializer'
import Version from '@apps/maha/models/version'

const listRoute = async (req, res) => {

  const versions = await Version.query(qb => {
    qb.where('versionable_type', req.params.versionable_type)
    qb.where('versionable_id', req.params.versionable_id)
    qb.where('team_id', req.team.get('id'))
    qb.orderBy('created_at', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(versions, VersionSerializer)

}

export default listRoute
