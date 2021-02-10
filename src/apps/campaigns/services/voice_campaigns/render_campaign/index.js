import { getSegment } from './utils'

const renderCampaign = async (req, { code, config }) => ({
  workflow: {
    code
  },
  steps: await getSegment(req, {
    steps: config.steps,
    parent: null,
    answer: null
  })
})

export default renderCampaign
