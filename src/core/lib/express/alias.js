import Alias from '../../../apps/maha/models/alias'
import qs from 'qs'

const aliasMiddleware = async (req, res, next) => {
  const alias = await Alias.query(qb => {
    qb.whereRaw('src=? or destination=?', [req.path,req.path])
  }).fetch({
    transacting: req.trx
  })
  if(alias) {
    const destination = alias.get('destination')
    const src = alias.get('src')
    const query = Object.keys(req.query).length > 0 ? `?${qs.stringify(req.query)}` : ''
    if(req.path === destination) {
      return res.status(301).redirect(`${src}${query}`)
    }
    req.url = req.originalUrl = `${destination}${query}`
    console.log(req.url)
  }
  next()
}

export default aliasMiddleware
