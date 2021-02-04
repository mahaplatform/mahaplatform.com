import Version from '@apps/maha/models/version'

const getPublished = async (req, params) => {

  const { versionable_type, versionable_id, key } = params

  const version = await Version.query(qb => {
    qb.where('versionable_type', versionable_type)
    qb.where('versionable_id', versionable_id)
    qb.where('key', key)
    qb.whereNotNull('pubished_at')
    qb.whereNull('unpubished_at')
    qb.orderBy('created_at', 'desc')
  }).fetch({
    transacting: req.trx
  })

  return version

}

export default getPublished
