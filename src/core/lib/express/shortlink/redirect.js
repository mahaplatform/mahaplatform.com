import ShortLink from '../../../../apps/maha/models/shortlink'
import collectObjects from '../../../utils/collect_objects'
import URL from 'url'

const hooks = collectObjects('hooks/shortlinks/redirect.js')

const url = URL.parse(process.env.SHORTURL_HOST)

const redirectRoute = async (req, res, next) => {

  if(url.hostname !== req.host) return next()

  const shortlink = await ShortLink.query(qb => {
    qb.where('code', req.path.substr(1))
  }).fetch({
    transacting: req.trx
  })

  if(!shortlink) return next()

  await Promise.mapSeries(hooks, async (hook) => {
    return await hook.default(req, {
      shortlink
    })
  })

  res.redirect(301, shortlink.get('url'))

}

export default redirectRoute
