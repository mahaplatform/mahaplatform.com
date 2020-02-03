import Alias from '../../../apps/maha/models/alias'

const aliasMiddleware = async (req, res, next) => {
  const alias = await Alias.query(qb => {
    qb.where('src', req.url)
  }).fetch({
    transacting: req.trx
  })
  if(alias) {
    req.url = req.originalUrl = alias.get('destination')
  }
  next()
}

export default aliasMiddleware
