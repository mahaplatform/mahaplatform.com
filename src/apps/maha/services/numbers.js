import Number from '../models/number'

export const findOrCreateNumber = async (req, params) => {

  return await Number.fetchOrCreate({
    number: params.number
  }, {
    transacting: req.trx
  })

}
