import Answer from '../models/answer'

export const updateAnswers = async (req, { question, answers }) => {

  await Promise.map(answers, async (data, index) => {

    if(data.id) {

      const answer = await Answer.scope({
        team: req.team
      }).query(qb => {
        qb.where('id', data.id)
      }).fetch({
        transacting: req.trx
      })

      return await answer.save({
        text: data.text,
        delta: index,
        is_active: data.is_active,
        is_correct: data.is_correct
      }, {
        transacting: req.trx
      })

    }

    await Answer.forge({
      team_id: req.team.get('id'),
      question_id: question.get('id'),
      delta: index,
      text: data.text,
      is_active: data.is_active,
      is_correct: data.is_correct
    }).save(null, {
      transacting: req.trx
    })

  })

}
