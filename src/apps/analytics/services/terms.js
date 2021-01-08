import Term from '@apps/analytics/models/term'

export const getTerm = async(req, data) => {

  const term = await Term.query(qb => {
    qb.where('text', data.mkt_term)
  }).fetch({
    transacting: req.trx
  })

  if(term) return term

  return await Term.forge({
    text: data.mkt_term
  }).save(null, {
    transacting: req.trx
  })

}
