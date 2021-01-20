const storeSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  contact_config: result.get('contact_config'),
  permalink: result.get('permalink'),
  url: result.get('url'),
  program: program(result.related('program')),
  abandoned_count: result.get('abandoned_count'),
  active_count: result.get('active_count'),
  orders_count: result.get('orders_count'),
  unfulfilled_count: result.get('unfulfilled_count'),
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
export default storeSerializer
