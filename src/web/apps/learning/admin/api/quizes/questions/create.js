import { activity } from '../../../../../../core/services/routes/activities'
import QuestionSerializer from '../../../../serializers/question_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import socket from '../../../../../../core/services/routes/emitter'
import { updateAnswers } from '../../../../services/questions'
import Question from '../../../../models/question'

const createRoute = async (req, res) => {

  const question = await Question.forge({
    team_id: req.team.get('id'),
    quiz_id: req.params.quiz_id,
    ...whitelist(req.body, ['text','explanation'])
  }).save(null, {
    transacting: req.trx
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

export default createRoute
