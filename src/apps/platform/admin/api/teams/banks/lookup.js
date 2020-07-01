import braintree from '../../../../../../core/services/braintree'
import Bank from '../../../../../finance/models/bank'
import _ from 'lodash'

const lookupRoute = async (req, res) => {

  const banks = await await Bank.query(qb => {
    qb.where('team_id', req.params.team_id)
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const ids = banks.map(bank => bank.get('braintree_id'))

  const data = await new Promise((resolve, reject) => {
    braintree.bankAccount.all((err, banks) => {
      resolve(banks.filter(bank => {
        return bank.status === 'active'
      }).filter(bank => {
        return !_.includes(ids, bank.id)
      }).map(bank => ({
        id: bank.id
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
