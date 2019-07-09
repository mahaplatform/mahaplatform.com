import Administration from '../../../../models/administration'
import Question from '../../../../models/question'
import Quiz from '../../../../models/quiz'

const getAdministration = async (req, quiz) => {

  const administration = await Administration.scope({
    team: req.team
  }).query(qb => {
    qb.where('team_id', req.team.get('id')),
    qb.where('user_id', req.user.get('id'))
    qb.where('quiz_id', quiz.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(administration) return administration

  return await Administration.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    quiz_id: quiz.get('id'),
    correct_count: 0,
    total_count: quiz.related('questions').length
  }).save(null, {
    transacting: req.trx
  })

}

const showRoute = async (req, res) => {

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

  const administration = await getAdministration(req, quiz)

  res.status(200).respond(administration, (req, administration) => ({
    id: quiz.get('id'),
    title: quiz.get('title')
  }))

}

export default showRoute
