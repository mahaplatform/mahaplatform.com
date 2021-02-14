import Version from '@apps/maha/models/version'
import moment from 'moment'

const publishVersion = async (req, params) => {

  const { versionable_type, versionable_id, key, publish_id } = params

  const published = await Version.query(qb => {
    qb.where('versionable_type', versionable_type)
    qb.where('versionable_id', versionable_id)
    qb.where('key', key)
    qb.whereNotNull('published_at')
    qb.whereNull('unpublished_at')
  }).fetch({
    transacting: req.trx
  })

  if(published) {
    await published.save({
      unpublished_at: moment()
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  const publish = await Version.query(qb => {
    qb.where('versionable_type', versionable_type)
    qb.where('versionable_id', versionable_id)
    qb.where('key', key)
    qb.where('id', publish_id)
  }).fetch({
    transacting: req.trx
  })

  await publish.save({
    published_at: moment(),
    unpublished_at: null
  }, {
    transacting: req.trx,
    patch: true
  })

  return publish

}

export default publishVersion
