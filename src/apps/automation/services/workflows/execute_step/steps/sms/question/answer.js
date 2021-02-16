import evaluate from '../../control/ifthen/evaluate'

const sanitize = (text) => text.trim().toLowerCase()

const answer = async (req, { state, step, twiml, tokens }) => {

  const { answers } = step

  const index = await Promise.reduce(answers, async (found, answer, index) => {
    const { operation, text } = answer
    if(found >= 0) return found
    return await evaluate({
      answer: {
        [operation]: sanitize(text)
      }
    }, {
      answer: sanitize(req.body.Body)
    }) ? index : found
  }, -1)

  return {
    action: {
      data: {
        action: 'answer',
        answer: req.body.Body
      }
    },
    session: {},
    next: index >= 0 ? `${state}.answers.${index}.steps.0` : `${state}.else.steps.0`
  }

}

export default answer
