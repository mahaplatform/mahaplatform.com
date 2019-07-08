import { activity } from '../../../../../../core/services/routes/activities'
import QuestionSerializer from '../../../../serializers/question_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import { updateAnswers } from '../../../../services/questions'
import Question from '../../../../models/question'

const destroyRoute = async (req, res) => {

  const question = await Question.scope({
    team: req.team
  }).query(qb => {
    qb.where('quiz_id', req.params.quiz_id)
  }).fetch({
    withRelated: ['answers'],
    transacting: req.trx
  })

  if(!question) return res.status(404).respond({
    code: 404,
    message: 'Unable to load question'
  })



  await updateAnswers(req, {
    question,
    answers: req.body.answers
  })

  await activity(req, {
    story: 'created {object}',
    object: question
  })

  await socket.refresh(req, [
    `/admin/learning/quizes/${req.params.quiz_id}/questions`
  ])

  res.status(200).respond(question, QuestionSerializer)

}

export default destroyRoute
