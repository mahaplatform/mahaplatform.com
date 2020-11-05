import CompetencySerializer from '../../../serializers/competency_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Competency from '../../../models/competency'

const updateRoute = async (req, res) => {

  const competency = await Competency.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!competency) return res.status(404).respond({
    code: 404,
    message: 'Unable to load competency'
  })

  await competency.save({
    ...whitelist(req.body, ['title','description','category_id','level'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: competency
  })

  await socket.refresh(req, [
    '/admin/learning/competencies',
    `/admin/learning/competencies/${competency.get('id')}`
  ])

  res.status(200).respond(competency, CompetencySerializer)

}

export default updateRoute
