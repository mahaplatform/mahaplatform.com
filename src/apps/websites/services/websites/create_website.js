import generateCode from '@core/utils/generate_code'
import Website from '@apps/websites/models/website'
import Domain from '@apps/websites/models/domain'

const createWebsite = async (req, { title, tld, favicon_id }) => {

  const code = await generateCode(req, {
    table: 'websites_websites'
  })

  const website = await Website.forge({
    team_id: req.team.get('id'),
    code,
    title,
    favicon_id
  }).save(null, {
    transacting: req.trx
  })

  await Domain.forge({
    team_id: req.team.get('id'),
    website_id: website.get('id'),
    name: tld,
    is_primary: true
  }).save(null, {
    transacting: req.trx
  })

  return website

}

export default createWebsite
