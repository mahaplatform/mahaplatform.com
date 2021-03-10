import Alias from '@apps/maha/models/alias'

const listRoute = async (req, res) => {

  const aliases = await Alias.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['src']
    },
    sort: {
      params: req.query.$sort
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(aliases, (req, alias) => ({
    id: alias.get('id'),
    src: alias.get('src'),
    destination: alias.get('destination')
  }))

}

export default listRoute
