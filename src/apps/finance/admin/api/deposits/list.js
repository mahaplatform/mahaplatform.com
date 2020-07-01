import DepositSerializer from '../../../serializers/deposit_serializer'
import Deposit from '../../../models/deposit'

const listRoute = async (req, res) => {

  const deposits = await Deposit.filterFetch({
    scope: (qb) => {
      qb.select('finance_deposits.*','finance_deposit_totals.*')
      qb.innerJoin('finance_deposit_totals', 'finance_deposit_totals.deposit_id', 'finance_deposits.id')
      qb.innerJoin('finance_banks', 'finance_banks.id', 'finance_deposits.bank_id')
      qb.where('finance_deposits.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['bank_id','date']
    },
    aliases: {
      bank: 'finance_banks.title'
    },
    sort: {
      sort: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','date','bank','created_at']
    },
    page: req.query.$page,
    withRelated: ['bank','payments'],
    transacting: req.trx
  })

  res.status(200).respond(deposits, DepositSerializer)

}

export default listRoute
