const WorkflowSerializer = (req, result) => ({
  id: result.get('id'),
  steps: result.get('steps'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default WorkflowSerializer
