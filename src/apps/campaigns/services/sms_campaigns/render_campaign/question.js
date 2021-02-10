import { getSegment } from './utils'

const question = async (req, { steps, step }) => {
  const { answers } = step.config
  return {
    verb: 'question',
    answers: await Promise.mapSeries(answers, async(answer) => ({
      operation: answer.operation,
      text: answer.text,
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: answer.code
      })
    })),
    else: {
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: 'else'
      })
    }
  }
}

export default question
