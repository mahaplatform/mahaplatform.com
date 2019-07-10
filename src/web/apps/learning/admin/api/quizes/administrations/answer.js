import Administration from '../../../../models/administration'
import Answering from '../../../../models/answering'
import Question from '../../../../models/question'
import Quiz from '../../../../models/quiz'

const answerRoute = async (req, res) => {

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

  const correct_answer = question.related('answers').find(answer => {
    return answer.get('is_correct')
  })

  const answering = await Answering.forge({
    team_id: req.team.get('id'),
    administration_id: administration.get('id'),
    question_id: question.get('id'),
    answer_id: req.body.answer_id,
    is_correct: req.body.answer_id === correct_answer.get('id')
  }).save(null, {
    transacting: req.trx
  })

  await administration.load(['answerings'], {
    transacting: req.trx
  })

  const increment = req.body.answer_id === correct_answer.get('id') ? 1 : 0

  const correct_count = administration.get('correct_count') + increment

  const passing_score = quiz.get('passing_score')

  await administration.save({
    correct_count,
    was_passed: administration.get('is_complete') ? correct_count >= passing_score : null
  }, {
    patch: true,
    transacting: req.trx
  })

  await administration.load(['answerings'], {
    transacting: req.trx
  })

  res.status(200).respond(answering, (req, answering) => ({
    answering: {
      answer_id: answering.get('answer_id'),
      is_correct: answering.get('is_correct'),
      correct_answer: correct_answer.get('id'),
      explanation: question.get('explanation')
    },
    quiz: {
      id: quiz.get('id'),
      title: quiz.get('title'),
      score: administration.get('score'),
      was_passed: administration.get('was_passed'),
      correct_count: administration.get('correct_count'),
      total_count: administration.get('total_count'),
      is_complete: administration.get('is_complete')
    }
  }))

}

export default answerRoute
