import { getSegment } from '../../utils'

const ifthen = async (req, { steps, step }) => {
  const { branches } = step.config
  return {
    branches: await Promise.mapSeries(branches, async(branch) => ({
      name: branch.name,
      criteria: branch.criteria,
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: branch.code
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

export default ifthen
