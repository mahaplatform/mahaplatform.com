import braintree from '../../../../../core/services/braintree'
import Bank from '../../../../finance/models/bank'
import _ from 'lodash'

const lookupRoute = async (req, res) => {

  const banks = await await Bank.fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const ids = banks.map(bank => bank.get('braintree_id'))

  const data = await new Promise((resolve, reject) => {
    braintree.merchantAccount.all((err, merchants) => {
      resolve(merchants.filter(merchant => {
        return merchant.status === 'active'
      }).filter(merchant => {
        return !_.includes(ids, merchant.id)
      }).map(merchant => ({
        id: merchant.id
      })))
    })
  })

  data.pagination = {
    all: data.length,
    total: data.length,
    skip: 0,
    limit: data.length
  }

  res.status(200).respond(data)

}

export default lookupRoute
