import CreateDistributionQueue from '@apps/websites/queues/create_distribution_queue'
import { createHomePage, createNotFoundPage } from '@apps/websites/services/pages'
import { createDomain } from '@apps/websites/services/domains'
import generateCode from '@core/utils/generate_code'
import Website from '@apps/websites/models/website'

const createWebsite = async (req, { title, favicon_id, config }) => {

  const code = await generateCode(req, {
    table: 'websites_websites'
  })

  const website = await Website.forge({
    team_id: req.team.get('id'),
    code,
    title,
    favicon_id,
    config
  }).save(null, {
    transacting: req.trx
  })

  const home = await createHomePage(req, {
    website
  })

  const notfound = await createNotFoundPage(req, {
    website
  })

  await website.save({
    home_id: home.get('id'),
    notfound_id: notfound.get('id')
  }, {
    transacting: req.trx
  })

  await CreateDistributionQueue.enqueue(req, {
    website_id: website.get('id')
  })

  return website

}

export default createWebsite
