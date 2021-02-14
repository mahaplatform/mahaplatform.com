const list = async (req, { steps, step }) => ({
  type: 'contact',
  action: 'list',
  config: step.config
})

export default list
