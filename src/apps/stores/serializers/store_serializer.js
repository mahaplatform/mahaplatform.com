const storeSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  permalink: result.get('permalink'),
  url: result.get('url'),
  program: program(result.related('program')),
  workflow: workflow(result.related('workflow')),
  abandoned_count: result.get('abandoned_count'),
  active_count: result.get('active_count'),
  orders_count: result.get('orders_count'),
  revenue: result.get('revenue'),
  first_order: result.get('first_order'),
  last_order: result.get('last_order'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

const workflow = (workflow) => {
  if(!workflow.id) return
  return {
    id: workflow.get('id'),
    title: workflow.get('title')
  }
}

export default storeSerializer
