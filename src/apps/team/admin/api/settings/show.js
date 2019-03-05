import { Route } from 'maha'

const processor = async (req, trx, options) => {

  await req.team.load('logo', { transacting: trx })

  return {
    title: req.team.get('title'),
    subdomain: req.team.get('subdomain'),
    color: req.team.get('color'),
    logo_id: req.team.get('logo_id'),
    logo: req.team.related('logo').get('path')
  }

}

const showRoute = new Route({
  method: 'get',
  path: '/',
  processor
})

export default showRoute
