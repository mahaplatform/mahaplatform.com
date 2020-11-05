import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import QuizSerializer from '@apps/training/serializers/quiz_serializer'
import socket from '@core/services/routes/emitter'
import { updateQuestions } from '@apps/training/services/questions'
import Quiz from '@apps/training/models/quiz'

const updateRoute = async (req, res) => {

  const quiz = await Quiz.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['questions.answers'],
    transacting: req.trx
  })

  if(!quiz) return res.status(404).respond({
    code: 404,
    message: 'Unable to load quiz'
  })

  await quiz.save({
    ...whitelist(req.body, ['title','passing_score'])
  }, {
    transacting: req.trx
  })

  await updateQuestions(req, {
    quiz,
    questions: req.body.questions
  })

  await activity(req, {
    story: 'updated {object}',
    object: quiz
  })

  await socket.refresh(req, [
    `/admin/training/quizes/${req.params.id}`
  ])

  res.status(200).respond(quiz, QuizSerializer)

}

export default updateRoute
