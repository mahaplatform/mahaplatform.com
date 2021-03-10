import DepositSerializer from '@apps/finance/serializers/deposit_serializer'
import Deposit from '@apps/finance/models/deposit'

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
      payments_count: 'finance_deposit_totals.payments_count',
      refunds_count: 'finance_deposit_totals.refunds_count',
      bank: 'finance_banks.title'
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-date'],
      allowed: ['id','date','bank','payments_count','refunds_count','created_at']
    },
    page: req.query.$page,
    withRelated: ['bank'],
    transacting: req.trx
  })

  await res.status(200).respond(deposits, DepositSerializer)

}

export default listRoute
