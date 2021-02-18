import { getSegment } from '../../utils'

const timeofday = async (req, { steps, step }) => {
  const { timeblocks } = step.config
  return {
    timeblocks: await Promise.mapSeries(timeblocks, async(timeblock) => ({
      name: timeblock.name,
      days: timeblock.days,
      times: timeblock.times,
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: timeblock.code
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

export default timeofday
