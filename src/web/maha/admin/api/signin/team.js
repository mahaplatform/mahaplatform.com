import { Route, BackframeError, Team } from '../../../server'

const processor = async (req, trx, options) => {

  if(!req.body.subdomain) {
    throw new BackframeError({
      code: 422,
      message: 'Please enter your team\'s domain'
    })
  }

  const team = await Team.where({
    subdomain: req.body.subdomain
  }).fetch({
    withRelated: ['logo','strategies'],
    transacting: trx
  })

  if(!team) {
    throw new BackframeError({
      code: 422,
      message: 'Unable to find this domain'
    })
  }

  return {
    id: team.get('id'),
    title: team.get('title'),
    subdomain: team.get('subdomain'),
    color: team.get('color'),
    logo: team.related('logo').get('path'),
    strategies: team.related('strategies').map(strategy => {
      strategy.get('name')
    })
  }

}

const teamRoute = new Route({
  path: '/team',
  method: 'post',
  processor
})

export default teamRoute
