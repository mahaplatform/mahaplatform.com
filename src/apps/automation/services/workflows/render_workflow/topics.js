const list = async (req, { steps, step }) => ({
  verb: 'topic',
  topic_id: step.config.topic_id
})

export default list
