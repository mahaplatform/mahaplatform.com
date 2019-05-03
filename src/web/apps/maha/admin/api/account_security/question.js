import { Route, BackframeError } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  try {

    req.user = await req.user.save({
      security_question_id: req.body.security_question_id,
      security_question_answer: req.body.security_question_answer
    }, { patch: true, transacting: trx })

    return {
      security_question_id: req.body.security_question_id,
      security_question_answer: req.body.security_question_answer
    }

  } catch(err) {

    throw new BackframeError({
      code: 422,
      message: 'Unable to save account',
      errors: err.toJSON()
    })

  }

}

const questionRoute = new Route({
  method: 'patch',
  path: '/question',
  processor
})

export default questionRoute
