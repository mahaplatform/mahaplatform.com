import Website from '@apps/websites/models/website'

const showRoute = async (req, res) => {

  const website = await Website.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['domains','favicon'],
    transacting: req.trx
  })

  if(!website) return res.status(404).respond({
    code: 404,
    message: 'Unable to load website'
  })

  await res.status(200).respond(website, (req, website) => ({
    title: website.get('title'),
    code: website.get('code'),
    favicon: website.related('favicon') ? website.related('favicon').get('path') : null,
    domains: website.related('domains').map(domain => ({
      name: domain.get('name'),
      is_primary: domain.get('is_primary')
    }))
  }))

}

export default showRoute
