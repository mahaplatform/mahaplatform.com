import BankSerializer from '@apps/finance/serializers/bank_serializer'
import Bank from '@apps/finance/models/bank'

const listRoute = async (req, res) => {

  const banks = await Bank.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
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
    transacting: req.trx
  })

  res.status(200).respond(banks, BankSerializer)

}

export default listRoute
