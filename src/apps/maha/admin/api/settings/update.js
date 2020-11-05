import { activity } from '@core/services/routes/activities'
import Installation from '@apps/maha/models/installation'

const showRoute = async (req, res) => {

  if(!req.apps[req.params.code]) return res.status(404).respond({
    code: 404,
    message: 'Unable to find app'
  })

  const installation = await Installation.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('app_id', req.apps[req.params.code].id)
  }).fetch({
    withRelated: ['app'],
    transacting: req.trx
  })

  await installation.save({
    settings: req.body.settings
  },{
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated settings for {object}',
    object: installation.related('app')
  })

  res.status(200).respond(installation.related('app'))

}

export default showRoute
