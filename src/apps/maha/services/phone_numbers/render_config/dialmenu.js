import { announce, getSegment } from './utils'

const dialmenu = async (req, { steps, step }) => {
  const { config } = step
  return {
    verb: 'dialmenu',
    ...await announce(req, {
      strategy: config.strategy,
      voice: config.voice,
      text: config.text,
      recording_id: config.recording_id
    }),
    options: await Promise.mapSeries(config.options, async(option) => ({
      number: option.number,
      ...await announce(req, {
        strategy: option.strategy,
        voice: option.voice,
        text: option.text,
        recording_id: option.recording_id
      }),
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: option.code
      })
    }))
  }
}

export default dialmenu
