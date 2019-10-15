import Administration from '../../../../models/administration'
import Question from '../../../../models/question'
import Quiz from '../../../../models/quiz'

const questionRoute = async (req, res) => {

  const quiz = await Quiz.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.quiz_id)
  }).fetch({
    transacting: req.trx
  })

  if(!quiz) return res.status(404).respond({
    code: 404,
    message: 'Unable to load quiz'
  })

  const administration = await Administration.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
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
    qb.leftJoin('training_answerings','training_answerings.question_id','training_questions.id')
    qb.where('training_questions.quiz_id', quiz.get('id'))
    qb.whereNull('training_answerings.id')
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
