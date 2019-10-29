import Site from '../../models/site'

const teamRoute = async (req, res, next) => {

  const site = await Site.query(qb => {
    qb.where('id', req.params.site_id)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = site.related('team')

  next()

}

export default teamRoute
