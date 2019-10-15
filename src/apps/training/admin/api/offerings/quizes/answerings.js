import Fulfillment from '../../../../models/fulfillment'
import Answering from '../../../../models/answering'
import Question from '../../../../models/question'

const answeringsRoute = async (req, res) => {

  const fulfillments = await Fulfillment.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('offering_id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  const questions = await Question.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('quiz_id', req.params.id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    withRelated: ['answers'],
    transacting: req.trx
  })

  const answerings = await Answering.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.innerJoin('training_administrations','training_administrations.id','training_answerings.administration_id')
    qb.innerJoin('training_fulfillments','training_fulfillments.user_id','training_administrations.user_id')
    qb.where('training_fulfillments.offering_id', req.params.offering_id)
    qb.where('training_administrations.quiz_id', req.params.id)
  }).fetchAll({
    withRelated: ['question','answer','administration'],
    transacting: req.trx
  }).then(result => result.toArray())

  const data = questions.map(question => {
    const questionanswerings = answerings.filter(answering => {
      return answering.get('question_id') === question.get('id')
    })
    return {
      text: question.get('text'),
      answerings: fulfillments.map(fulfillment => {
        const answering = questionanswerings.find(answering => {
          return answering.related('administration').get('user_id') === fulfillment.get('user_id')
        })
        return {
          user: {
            id: fulfillment.related('user').get('id'),
            full_name: fulfillment.related('user').get('full_name'),
            initials: fulfillment.related('user').get('initials'),
            photo: fulfillment.related('user').related('photo').get('path')
          },
          answer: answering ? answering.related('answer').get('delta') : null,
          is_correct: answering ? answering.get('is_correct') : null
        }
      })
    }
  })

  res.status(200).respond(data)

}

export default answeringsRoute
