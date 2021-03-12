import Domain from '@apps/websites/models/domain'

const createDomain = async (req, { website, name, is_primary, is_system, zone }) => {

  const domain = await Domain.forge({
    team_id: req.team.get('id'),
    website_id: website.get('id'),
    name,
    is_primary,
    is_system,
    config: { zone }
  }).save(null, {
    transacting: req.trx
  })

  return domain

}

export default createDomain
