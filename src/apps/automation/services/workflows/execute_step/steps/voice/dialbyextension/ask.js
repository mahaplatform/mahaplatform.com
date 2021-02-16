import { getUrl, performAsk } from '../../utils'

const ask = (req, { config, enrollment, state, step, twiml }) => {

  const { extensions } = step

  const gather = twiml.gather({
    action: getUrl(req, { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: extensions.reduce((digits, extension) => {
      return Math.max(digits, extension.extension.length)
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
