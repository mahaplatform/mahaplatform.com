import Page from '@apps/analytics/models/page'

export const createPage = async(req, params) => {

  const page = await Page.query(qb => {
    qb.where('url', params.url)
  }).fetch({
    transacting: req.trx
  })

  if(page) return page

  return await Page.forge({
    url: params.url,
    urlscheme: params.urlscheme,
    urlhost: params.urlhost,
    urlport: params.urlport,
    urlpath: params.urlpath,
    urlquery: params.urlquery,
    urlfragment: params.urlfragment
  }).save(null, {
    transacting: req.trx
  })

}
