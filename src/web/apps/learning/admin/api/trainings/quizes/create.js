import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import QuizSerializer from '../../../../serializers/quiz_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import { updateQuestions } from '../../../../services/questions'
import Quiz from '../../../../models/quiz'

const createRoute = async (req, res) => {

  const quiz = await Quiz.forge({
    team_id: req.team.get('id'),
    training_id: req.params.training_id,
    ...whitelist(req.body, ['title'])
  }).save(null, {
    transacting: req.trx
  })

  await updateQuestions(req, {
    quiz,
    questions: req.body.questions
  })

  await activity(req, {
    story: 'created {object}',
    object: quiz
  })

  await socket.refresh(req, [
    `/admin/learning/trainings/${req.params.training_id}`
  ])

  res.status(200).respond(quiz, QuizSerializer)

}

export default createRoute
