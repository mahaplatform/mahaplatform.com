const productSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  project: project(result.related('project')),
  revenue_type: revenue_type(result.related('revenue_type')),
  price_type: result.get('price_type'),
  price: result.get('price'),
  fixed_price: result.get('fixed_price'),
  low_price: result.get('low_price'),
  high_price: result.get('high_price'),
  tax_rate: result.get('tax_rate'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const project = (project) => {
  if(!project.get('id')) return null
  return {
    id: project.get('id'),
    title: project.get('title'),
    full_title: project.get('full_title'),
    integration: project.get('integration')
  }
}

const revenue_type = (revenue_type) => {
  if(!revenue_type.get('id')) return null
  return {
    id: revenue_type.get('id'),
    title: revenue_type.get('title'),
    description: revenue_type.get('description'),
    full_title: revenue_type.get('full_title'),
    integration: revenue_type.get('integration')
  }
}

export default productSerializer
