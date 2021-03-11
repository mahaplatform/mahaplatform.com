import { getPublished } from '@apps/maha/services/versions'
import Website from '@apps/websites/models/website'
import Alias from '@apps/websites/models/alias'

const showRoute = async (req, res) => {

  const website = await Website.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['favicon'],
    transacting: req.trx
  })

  if(!website) return res.status(404).respond({
    code: 404,
    message: 'Unable to load website'
  })

  const alias = await Alias.query(qb => {
    qb.where('website_id', website.get('id'))
    qb.where('path', req.path)
  }).fetch({
    withRelated: ['page'],
    transacting: req.trx
  })

  if(!alias) return res.status(404).respond({
    code: 404,
    message: 'Unable to load alias'
  })

  const version = await getPublished(req, {
    versionable_type: 'websites_pages',
    versionable_id: alias.get('page_id'),
    key: 'config'
  })

  if(!version) return res.status(404).respond({
    code: 404,
    message: 'Unable to load version'
  })

  const page = alias.related('page')

  await res.status(200).respond(version, (req, version) => ({
    title: page.get('title'),
    code: page.get('code'),
    config: version.get('value')
  }))

}

export default showRoute
