import AssignmentSerializer from '../../../serializers/assignment_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Fulfillment from '../../../models/fulfillment'
import knex from '../../../../../core/services/knex'
import Assignment from '../../../models/assignment'
import Training from '../../../models/training'

const updateRoute = async (req, res) => {

  const assignment = await Assignment.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!assignment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load assignment'
  })

  const channels = [
    `/admin/training/assignments/${assignment.get('id')}`
  ]

  await assignment.save({
    option_id: req.body.option_id
  }, {
    patch: true,
    transacting: req.trx
  })

  const trainings = await Training.query(qb => {
    qb.innerJoin('training_options_trainings', 'training_options_trainings.training_id', 'training_trainings.id')
    qb.where('training_options_trainings.option_id', req.body.option_id)
  }).fetchAll({
    transacting: req.trx
  }).then (result => result.toArray())

  await knex('training_fulfillments').transacting(req.trx).where({
    assignment_id: assignment.get('id')
  }).del()

  await Promise.mapSeries(trainings, async (training) => {
    await Fulfillment.forge({
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      assignment_id: assignment.get('id'),
      training_id: training.get('id')
    }).save(null, {
      transacting: req.trx
    })
  })

  // await audit(req, {
  //   story: 'regstration changed',
  //   auditable: assignment
  // })

  // await activity(req, {
  //   story: 'registered for {object}',
  //   object: category
  // })

  await socket.refresh(req, channels)

  res.status(200).respond(assignment, AssignmentSerializer)

}

export default updateRoute
