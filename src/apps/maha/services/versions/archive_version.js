import Version from '@apps/maha/models/version'
import moment from 'moment'

const archiveVersion = async (req, params) => {

  const { versionable_type, versionable_id, key, id } = params

  const version = await Version.query(qb => {
    qb.where('versionable_type', versionable_type)
    qb.where('versionable_id', versionable_id)
    qb.where('key', key)
    if(id) qb.where('id', id)
    qb.orderBy('created_at', 'desc')
  }).fetch({
    transacting: req.trx
  })

  await version.save({
    unpublished_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

  await version.load(['user'], {
    transacting: req.trx
  })

  return version

}

export default archiveVersion
