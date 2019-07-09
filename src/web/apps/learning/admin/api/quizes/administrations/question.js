import Administration from '../../../../models/administration'
import Question from '../../../../models/question'
import Quiz from '../../../../models/quiz'

const questionRoute = async (req, res) => {

  const quiz = await Quiz.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.quiz_id)
  }).fetch({
    transacting: req.trx
  })

  if(!quiz) return res.status(404).respond({
    code: 404,
    message: 'Unable to load quiz'
  })

  const administration = await Administration.scope({
    team: req.team
  }).query(qb => {
    qb.where('team_id', req.team.get('id')),
    qb.where('user_id', req.user.get('id'))
    qb.where('quiz_id', quiz.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(!administration) return res.status(404).respond({
    code: 404,
    message: 'Unable to load administration'
  })

  const question = await Question.query(qb => {
    qb.leftJoin('learning_answerings','learning_answerings.question_id','learning_questions.id')
    qb.where('learning_questions.quiz_id', quiz.get('id'))
    qb.whereNull('learning_answerings.id')
    qb.orderBy('delta', 'asc')
  }).fetch({
    withRelated: ['answers'],
    transacting: req.trx
  })

  res.status(200).respond(question, (req, question) => ({
    id: question.get('id'),
    text: question.get('text'),
    answers: question.related('answers').map(answer => ({
      id: answer.get('id'),
      text: answer.get('text')
    }))
  }))

}

export default questionRoute
