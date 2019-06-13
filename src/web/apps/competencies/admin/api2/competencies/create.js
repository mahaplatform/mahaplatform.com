import CompetencySerializer from '../../../serializers/competency_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Competency from '../../../models/competency'

const createRoute = async (req, res) => {

  const competency = await Competency.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','description','category_id','level'])
  }).save(null, {
    transacting: req.trx
  })

  await competency.load(['category'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: competency
  })

  await socket.refresh(req, [
    '/admin/competencies/competencies'
  ])

  res.status(200).respond(competency, (competency) => {
    return CompetencySerializer(req, req.trx, competency)
  })

}

export default createRoute
