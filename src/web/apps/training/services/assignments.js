import Fulfillment from '../models/fulfillment'
import knex from '../../../core/services/knex'
import Training from '../models/training'

export const chooseOption = async (req, assignment, params) => {

  await assignment.save({
    option_id: params.option_id
  }, {
    patch: true,
    transacting: req.trx
  })

  const trainings = await Training.query(qb => {
    qb.innerJoin('training_options_trainings', 'training_options_trainings.training_id', 'training_trainings.id')
    qb.where('training_options_trainings.option_id', params.option_id)
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

}
