import DepositSerializer from '../../../serializers/deposit_serializer'
import Deposit from '../../../models/deposit'

const showRoute = async (req, res) => {

  const deposit = await Deposit.query(qb => {
    qb.select('finance_deposits.*','finance_deposit_totals.*')
    qb.innerJoin('finance_deposit_totals', 'finance_deposit_totals.deposit_id', 'finance_deposits.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['bank','payments'],
    transacting: req.trx
  })

  if(!deposit) return res.status(404).respond({
    code: 404,
    message: 'Unable to load deposit'
  })

  res.status(200).respond(deposit, DepositSerializer)

}

export default showRoute
