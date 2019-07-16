import Answering from '../../../../models/answering'
import Question from '../../../../models/question'

const answeringsRoute = async (req, res) => {

  const questions = await Question.scope({
    team: req.team
  }).query(qb => {
    qb.where('quiz_id', req.params.id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    withRelated: ['answers'],
    transacting: req.trx
  })

  const answerings = await Answering.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('training_administrations','training_administrations.id','training_answerings.administration_id')
    qb.innerJoin('training_fulfillments','training_fulfillments.user_id','training_administrations.user_id')
    qb.where('training_fulfillments.offering_id', req.params.offering_id)
    qb.where('training_administrations.quiz_id', req.params.id)
  }).fetchAll({
    withRelated: ['question','answer','administration.user.photo'],
    transacting: req.trx
  }).then(result => result.toArray())

  const data = questions.map(question => ({
    text: question.get('text'),
    answerings: answerings.filter(answering => {
      return answering.get('question_id') === question.get('id')
    }).map(answering => ({
      user: {
        id: answering.related('administration').related('user').get('id'),
        full_name: answering.related('administration').related('user').get('full_name'),
        initials: answering.related('administration').related('user').get('initials'),
        photo: answering.related('administration').related('user').related('photo').get('path')
      },
      delta: answering.related('answer').get('delta'),
      is_correct: answering.get('is_correct')
    }))
  }))



  res.status(200).respond(data)

}

export default answeringsRoute
