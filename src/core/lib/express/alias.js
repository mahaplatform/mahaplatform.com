import Alias from '../../../apps/maha/models/alias'

const aliasMiddleware = async (req, res, next) => {
  const alias = await Alias.query(qb => {
    qb.whereRaw('src=? or destination=?', [req.url,req.url])
  }).fetch({
    transacting: req.trx
  })
  if(alias) {
    if(req.url === alias.get('destination')) {
      return res.status(301).redirect(alias.get('src'))
    }
    req.url = req.originalUrl = alias.get('destination')
  }
  next()
}

export default aliasMiddleware
