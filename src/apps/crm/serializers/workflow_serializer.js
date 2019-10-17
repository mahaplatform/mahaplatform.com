const WorkflowSerializer = (req, result) => ({
  id: result.get('id'),
  steps: result.related('steps').map(step),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const step = (step) => {
  if(step.id === null) return null
  return {
    id: step.get('id'),
    code: step.get('code'),
    delta: step.get('delta'),
    type: step.get('type'),
    subtype: step.get('subtype'),
    parent: step.get('parent_id') ? step.related('parent').get('code') : null,
    answer: step.get('answer') || null,
    config: step.get('config')
  }
}

export default WorkflowSerializer
