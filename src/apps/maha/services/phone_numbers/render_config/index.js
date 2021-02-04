import { getSegment } from './utils'

const renderConfig = async (req, { phone_number, config }) => {
  return {
    workflow: {
      code: 'abcdef'
    },
    steps: await getSegment(req, {
      steps: config.steps,
      parent: null,
      answer: null
    })
  }
}

export default renderConfig
