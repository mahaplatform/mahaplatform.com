import { createVersion } from '@apps/maha/services/versions'
import generateCode from '@core/utils/generate_code'
import Alias from '@apps/websites/models/alias'
import Page from '@apps/websites/models/page'
import notFound from './templates/notfound'
import home from './templates/home'

export const createPage = async (req, { website, title, permalink, config }) => {

  const code = await generateCode(req, {
    table: 'websites_pages'
  })

  const page = await Page.forge({
    team_id: req.team.get('id'),
    website_id: website.get('id'),
    code,
    title
  }).save(null, {
    transacting: req.trx
  })

  await Alias.forge({
    team_id: req.team.get('id'),
    website_id: website.get('id'),
    page_id: page.get('id'),
    path: permalink,
    is_primary: true
  }).save(null, {
    transacting: req.trx
  })

  await createVersion(req, {
    versionable_type: 'websites_pages',
    versionable_id: page.get('id'),
    key: 'config',
    value: config,
    publish: true
  })

  return page

}

export const createHomePage = async (req, { website }) => {
  return await createPage(req, {
    website,
    title: 'Home Page',
    permalink: '/home',
    config: home
  })
}

export const createNotFoundPage = async (req, { website }) => {
  return await createPage(req, {
    website,
    title: 'Not Found',
    permalink: '/404',
    config: notFound
  })
}

export default createPage
