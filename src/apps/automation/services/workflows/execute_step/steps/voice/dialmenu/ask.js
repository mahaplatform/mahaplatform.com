import { getUrl, performAsk } from '../../utils'

const ask = (req, { config, enrollment, state, step, twiml }) => {

  const gather = twiml.gather({
    action: getUrl(req, { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: step.options.reduce((digits, option) => {
      return Math.max(digits, option.number.length)
    }, 0),
    timeout: 3
  })

  const ask = performAsk(req, { config, state, step, twiml: gather })

  twiml.redirect(getUrl(req, { state: `${state}.noinput.steps.0` }))

  return {
    action: {
      data: {
        action: 'ask',
        ...ask.action.data
      }
    },
    twiml
  }

}

export default ask
