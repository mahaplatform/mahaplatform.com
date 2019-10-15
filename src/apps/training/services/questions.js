import { whitelist } from '../../../core/services/routes/params'
import Question from '../models/question'
import { updateAnswers } from './answers'

const createOrUpdateQuestion = async (req, quiz, data) => {

  if(data.id) {

    const question = await Question.scope(qb => {
      qb.where('team_id', req.team.get('id'))
    }).query(qb => {
      qb.where('quiz_id', quiz.get('id'))
      qb.where('id', data.id)
    }).fetch({
      transacting: req.trx
    })

    return await question.save({
      ...whitelist(data, ['delta','text','explanation'])
    }, {
      transacting: req.trx
    })

  }

  return await Question.forge({
    team_id: req.team.get('id'),
    quiz_id: quiz.get('id'),
    ...whitelist(data, ['delta','text','explanation'])
  }).save(null, {
    transacting: req.trx
  })

}

export const updateQuestions = async (req, { quiz, questions }) => {

  await Promise.map(questions, async (data, index) => {

    const question = await createOrUpdateQuestion(req, quiz, data)

    await updateAnswers(req, {
      question,
      answers: data.answers
    })

  })

}
