import { activity } from '../../../../../web/core/services/routes/activities'
import { whitelist } from '../../../../../web/core/services/routes/params'
import QuizSerializer from '../../../serializers/quiz_serializer'
import socket from '../../../../../web/core/services/routes/emitter'
import { updateQuestions } from '../../../services/questions'
import Quiz from '../../../models/quiz'

const createRoute = async (req, res) => {

  const training_id = (req.params.quizable_type === 'trainings') ? req.params.quizable_id : null

  const lesson_id = (req.params.quizable_type === 'lessons') ? req.params.quizable_id : null

  const quiz = await Quiz.forge({
    team_id: req.team.get('id'),
    training_id,
    lesson_id,
    ...whitelist(req.body, ['title','passing_score'])
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

  const channels = []

  if(training_id) channels.push(`/admin/training/trainings/${training_id}`)

  if(lesson_id) channels.push(`/admin/training/lessons/${lesson_id}`)

  await socket.refresh(req, channels)

  res.status(200).respond(quiz, QuizSerializer)

}

export default createRoute
