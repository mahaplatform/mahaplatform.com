import Version from '@apps/maha/models/version'

const rollbackVersion = async (req, params) => {

  const { versionable_type, versionable_id, key, rollback_id } = params

  const rollback = await Version.query(qb => {
    qb.where('versionable_type', versionable_type)
    qb.where('versionable_id', versionable_id)
    qb.where('key', key)
    qb.where('id', rollback_id)
  }).fetch({
    transacting: req.trx
  })

  const version = await Version.forge({
    team_id: req.team.get('id'),
    versionable_type,
    versionable_id,
    value: rollback.get('value'),
    published_at: null,
    unpublished_at: null
  }).save(null, {
    transacting: req.trx
  })

  return version

}

export default rollbackVersion
