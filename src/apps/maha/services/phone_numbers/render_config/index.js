import { getSegment } from './utils'

const renderConfig = async (req, { code, config }) => {
  return {
    workflow: {
      code
    },
    steps: await getSegment(req, {
      steps: config.steps,
      parent: null,
      answer: null
    })
  }
}

export default renderConfig
