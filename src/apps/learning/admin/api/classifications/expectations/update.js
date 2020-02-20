import socket from '../../../../../../core/services/routes/emitter'
import Classification from '../../../../models/classification'
import Expectation from '../../../../models/expectation'

const updateRoute = async (req, res) => {

  const classification = await Classification.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.classification_id)
  }).fetch({
    transacting: req.trx
  })

  if(!classification) return res.status(404).respond({
    code: 404,
    message: 'Unable to load classification'
  })

  await Expectation.query(qb => {
    qb.where('classification_id', req.params.classification_id)
  }).destroy({
    transacting: req.trx
  })

  await Promise.map(req.body.assignments, async assignment => {
    await Expectation.forge({
      team_id: req.team.get('id'),
      classification_id: req.params.classification_id,
      competency_id: assignment.competency_id
    }).save(null, {
      transacting: req.trx
    })
  })

  await socket.refresh(req, [
    `/admin/learning/classifications/${req.params.classification_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
