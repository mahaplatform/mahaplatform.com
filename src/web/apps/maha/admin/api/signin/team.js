import Team from '../../../models/team'

const teamRoute = async (req, res) => {

  if(!req.body.subdomain) return res.status(422).json({
    code: 422,
    message: 'Please enter your team\'s domain'
  })

  const team = await Team.where({
    subdomain: req.body.subdomain
  }).fetch({
    withRelated: ['logo','strategies'],
    transacting: req.trx
  })

  if(!team) return res.status(422).json({
    code: 422,
    message: 'Unable to find this team'
  })

  res.status(200).respond({
    id: team.get('id'),
    title: team.get('title'),
    subdomain: team.get('subdomain'),
    color: team.get('color'),
    logo: team.related('logo').get('path'),
    strategies: team.related('strategies').map(strategy => {
      strategy.get('name')
    })
  })

}

export default teamRoute
