import { activity } from '../../../../../../core/services/routes/activities'
import QuestionSerializer from '../../../../serializers/question_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import Question from '../../../../models/question'

const destroyRoute = async (req, res) => {

  const question = await Question.scope({
    team: req.team
  }).query(qb => {
    qb.where('quiz_id', req.params.quiz_id)
  }).fetch({
    withRelated: ['quiz','answers'],
    transacting: req.trx
  })

  if(!question) return res.status(404).respond({
    code: 404,
    message: 'Unable to load question'
  })

  //TODO: refresh assignments

  const channels = [
    `/admin/learning/trainings/${question.related('quiz').get('training_id')}`,
    `/admin/learning/quizes/${req.params.quiz_id}/questions`
  ]

  await Promise.map(question.related('answers'), async (answer) => {
    //TODO: destroy answerings
    await answer.destroy({
      transacting: req.trx
    })
  })

  await question.destroy({
    transacting: req.trx
  })

  await activity(req, {
    story: 'deleted {object}',
    object: question
  })

  await socket.refresh(req, channels)

  res.status(200).respond(question, QuestionSerializer)

}

export default destroyRoute
