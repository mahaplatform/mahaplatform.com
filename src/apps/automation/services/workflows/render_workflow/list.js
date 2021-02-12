const list = async (req, { steps, step }) => ({
  verb: 'list',
  list_id: step.config.list_id
})

export default list
