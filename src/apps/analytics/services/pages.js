import Domain from '@apps/analytics/models/domain'
import Page from '@apps/analytics/models/page'
import URL from 'url'

export const getPage = async(req, data) => {

  const page = await Page.query(qb => {
    qb.where('url', data.url)
  }).fetch({
    transacting: req.trx
  })

  if(page) return page

  const url = URL.parse(data.url)

  const domain = await Domain.fetchOrCreate({
    name: url.hostname
  }, {
    transacting: req.trx
  })

  return await Page.forge({
    domain_id: domain.get('id'),
    title: data.title,
    url: data.url,
    path: url.path
  }).save(null, {
    transacting: req.trx
  })

}
