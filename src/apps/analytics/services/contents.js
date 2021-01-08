import Content from '@apps/analytics/models/content'

export const getContent = async(req, data) => {

  const content = await Content.query(qb => {
    qb.where('text', data.mkt_content)
  }).fetch({
    transacting: req.trx
  })

  if(content) return content

  return await Content.forge({
    text: data.mkt_content
  }).save(null, {
    transacting: req.trx
  })

}
