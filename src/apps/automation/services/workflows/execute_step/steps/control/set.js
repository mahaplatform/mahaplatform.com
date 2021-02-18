import { getNext } from '../utils'

const setStep = async (req, { config, state, step }) => {

  const { name, value } = step.config

  return {
    action: {
      data: {
        [name.token]: value
      }
    },
    data: {
      [name.token]: value
    },
    next: getNext(req, { config, state })
  }

}

export default setStep
