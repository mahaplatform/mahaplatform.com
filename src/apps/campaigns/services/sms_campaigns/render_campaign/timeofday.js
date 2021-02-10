import { getSegment } from './utils'

const timeofday = async (req, { steps, step }) => {
  const { timeblocks } = step.config
  return {
    verb: 'timeofday',
    timeblocks: await Promise.mapSeries(timeblocks, async(timeblock) => ({
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
