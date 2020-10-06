import BankSerializer from '../../../../finance/serializers/bank_serializer'
import Bank from '../../../../finance/models/bank'

const showRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  res.status(200).respond(bank, BankSerializer)

}

export default showRoute
