import Version from '@apps/maha/models/version'

const createVersion = async (req, params) => {

  const { versionable_type, versionable_id, key, value } = params

  const version = await Version.forge({
    team_id: req.team.get('id'),
    versionable_type,
    versionable_id,
    key,
    value
  }).save(null, {
    transacting: req.trx
  })

  return version

}

export default createVersion
