import Alias from '../../../apps/maha/models/alias'
import qs from 'qs'

const getAlias = async (req, { path }) => {
  const alias = await Alias.query(qb => {
    qb.select(req.trx.raw('maha_aliases.*,next.id as next'))
    qb.joinRaw('left join maha_aliases next on next.src=maha_aliases.destination')
    qb.whereRaw('maha_aliases.src=?', path)
  }).fetch({
    transacting: req.trx
  })
  if(!alias.get('next')) return alias
  return await getAlias(req, {
    path: alias.get('destination')
  })
}

const aliasMiddleware = async (req, res, next) => {
  const query = Object.keys(req.query).length > 0 ? `?${qs.stringify(req.query)}` : ''
  const destination = await Alias.query(qb => {
    qb.whereRaw('destination=?', req.path)
  }).fetch({
    transacting: req.trx
  })
  if(destination) {
    return res.status(301).redirect(`${destination.get('src')}${query}`)
  }
  const alias = await getAlias(req, {
    path: req.path
  })
  if(alias) {
    req.url = req.originalUrl = `${alias.get('destination')}${query}`
  }
  next()
}

export default aliasMiddleware
