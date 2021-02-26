import Version from '@apps/maha/models/version'
import moment from 'moment'

const createVersion = async (req, params) => {

  const { versionable_type, versionable_id, key, value, publish } = params

  const version = await Version.forge({
    team_id: req.team.get('id'),
    versionable_type,
    versionable_id,
    user_id: req.user.get('id'),
    key,
    value,
    ...publish ? { published_at: moment() } : {}
  }).save(null, {
    transacting: req.trx
  })

  await version.load(['user'], {
    transacting: req.trx
  })

  return version

}

export default createVersion
