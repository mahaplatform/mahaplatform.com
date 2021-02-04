import Version from '@apps/maha/models/version'
import moment from 'moment'

const getVersion = async (req, { versionable_type, versionable_id, key }) => {

  const version = await Version.query(qb => {
    qb.where('versionable_type', versionable_type)
    qb.where('versionable_id', versionable_id)
    qb.where('key', key)
    qb.orderBy('created_at', 'desc')
  }).fetch({
    transacting: req.trx
  })

  if(version && !version.get('is_published')) return version

  return await Version.forge({
    team_id: req.team.get('id'),
    versionable_type,
    versionable_id,
    published_at: null,
    unpublished_at: null
  }).save(null, {
    transacting: req.trx
  })

}

const publishVersion = async (req, { version }) => {

  await version.save({
    published_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

  const oldversions = await Version.query(qb => {
    qb.where('versionable_type', version.get('versionable_type'))
    qb.where('versionable_id', version.get('versionable_id'))
    qb.whereNotNull('published_at')
    qb.whereNull('unpublished_at')
    qb.whereNot('id', version.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.map(oldversions, async (oldversion) => {
    await oldversion.save({
      unpublished_at: moment()
    }, {
      transacting: req.trx,
      patch: true
    })
  })

}

const updateVersion = async (req, params) => {

  const { versionable_type, versionable_id, value, publish } = params

  const version = await getVersion(req, {
    versionable_type,
    versionable_id,
    value
  })

  await version.save({
    value
  }, {
    transacting: req.trx,
    patch: true
  })

  if(!publish) return version

  await publishVersion(req, {
    version
  })

  return version

}

export default updateVersion
