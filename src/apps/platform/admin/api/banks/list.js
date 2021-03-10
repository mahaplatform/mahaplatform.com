import BankSerializer from '@apps/finance/serializers/bank_serializer'
import Bank from '@apps/finance/models/bank'

const listRoute = async (req, res) => {

  const banks = await Bank.filterFetch({
    scope: qb => {
      qb.innerJoin('maha_teams','maha_teams.id','finance_banks.team_id')
    },
    aliases: {
      team: 'maha_teams.title'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['status'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','title','created_at']
    },
    page: req.query.$page,
    withRelated: ['team'],
    transacting: req.trx
  })

  await res.status(200).respond(banks, BankSerializer)

}

export default listRoute
