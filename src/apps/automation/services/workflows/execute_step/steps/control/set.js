import { getNext } from '../utils'

const setStep = async (req, { config, state, step }) => {

  const { code, value } = step

  return {
    action: {
      data: {
        [code]: value
      }
    },
    data: {
      [code]: value
    },
    next: getNext(req, { config, state })
  }

}

export default setStep
