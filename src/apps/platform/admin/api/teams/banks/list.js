import BankSerializer from '../../../../../finance/serializers/bank_serializer'
import Bank from '../../../../../finance/models/bank'

const listRoute = async (req, res) => {

  const banks = await Bank.query(qb => {
    qb.where('team_id', req.params.team_id)
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(banks, BankSerializer)

}

export default listRoute
