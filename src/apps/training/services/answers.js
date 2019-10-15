import { whitelist } from '../../../core/services/routes/params'
import Answer from '../models/answer'

const createOrUpdateAnswer = async (req, question, data) => {

  if(data.id) {

    const answer = await Answer.scope(qb => {
      qb.where('team_id', req.team.get('id'))
    }).query(qb => {
      qb.where('id', data.id)
    }).fetch({
      transacting: req.trx
    })

    return await answer.save({
      ...whitelist(data, ['delta','text','is_active','is_correct'])
    }, {
      transacting: req.trx
    })

  }

  await Answer.forge({
    team_id: req.team.get('id'),
    question_id: question.get('id'),
    ...whitelist(data, ['delta','text','is_active','is_correct'])
  }).save(null, {
    transacting: req.trx
  })


}

export const updateAnswers = async (req, { question, answers }) => {

  await Promise.map(answers, async (data, index) => {
    await createOrUpdateAnswer(req, question, data)
  })

}
