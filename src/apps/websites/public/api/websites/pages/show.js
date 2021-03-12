import { getPublished } from '@apps/maha/services/versions'
import Website from '@apps/websites/models/website'
import Alias from '@apps/websites/models/alias'
import Page from '@apps/websites/models/page'

const getPage = async (req, { id, website }) => {

  if(id) {
    return await Page.query(qb => {
      qb.where('website_id', website.get('id'))
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    })
  }

  const alias = await Alias.query(qb => {
    qb.where('website_id', website.get('id'))
    qb.where('path', req.path)
  }).fetch({
    withRelated: ['page'],
    transacting: req.trx
  })

  if(!alias) return null

  return alias.related('page')

}

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

  const page = await getPage(req, {
    id: req.params.id,
    website
  })

  if(!page) return res.status(404).respond({
    code: 404,
    message: 'Unable to load page'
  })

  const version = await getPublished(req, {
    versionable_type: 'websites_pages',
    versionable_id: page.get('id'),
    key: 'config'
  })

  if(!version) return res.status(404).respond({
    code: 404,
    message: 'Unable to load version'
  })

  await res.status(200).respond(version, (req, version) => ({
    title: page.get('title'),
    code: page.get('code'),
    config: version.get('value')
  }))

}

export default showRoute
