const dial = async (req, { steps, step }) => {
  const { config } = step
  return {
    config: {
      strategy: config.strategy,
      say: config.say,
      recording_id: config.recording_id
    },
    recipients: await Promise.mapSeries(config.recipients, async(option) => ({
      strategy: option.strategy,
      number: option.number,
      user_id: option.user_id
    }))
  }
}

export default dial
