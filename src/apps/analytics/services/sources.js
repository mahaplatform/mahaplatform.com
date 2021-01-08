import Source from '@apps/analytics/models/source'

export const getSource = async(req, data) => {

  const source = await Source.query(qb => {
    qb.where('text', data.mkt_source)
  }).fetch({
    transacting: req.trx
  })

  if(source) return source

  return await Source.forge({
    text: data.mkt_source
  }).save(null, {
    transacting: req.trx
  })

}
