import { Route, Installation } from 'maha'

const activity = story => (req, trx, object, options) => ({
  story: 'installed {object}',
  object
})

const processor = async (req, trx, options) => {

  const installation = await Installation.where({
    app_id: req.params.id,
    team_id: req.team.get('id')
  }).fetch({ transacting: trx })

  if(installation) return true

  const newinstallation = await Installation.forge({
    app_id: req.params.id,
    team_id: req.team.get('id'),
    settings: {}
  }).save(null, { transacting: trx })

  await newinstallation.load(['app'], { transacting: trx })

  return newinstallation

}

const refresh = (req, trx, result, options) => [
  {
    channel: 'team',
    target: [
      '/admin/team/apps',
      `/admin/team/apps/${req.params.id}`
    ]
  }
]

const messages = (req, trx, result, options) => ({
  channel: 'team',
  action: 'session'
})

const installRoute = new Route({
  activity,
  messages,
  method: 'get',
  path: '/install',
  processor,
  refresh
})

export default installRoute
