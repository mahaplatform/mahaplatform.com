import { getSegment } from './utils'

const renderCampaign = async (req, { config }) => ({
  steps: await getSegment(req, {
    steps: config.steps,
    parent: null,
    answer: null
  })
})

export default renderCampaign
