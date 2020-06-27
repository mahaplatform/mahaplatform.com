const productSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  title: result.get('title'),
  description: result.get('description'),
  variants: result.related('variants').map(variant),
  options: result.get('options'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const variant = (variant) => {
  if(!variant.id) return null
  return {
    id: variant.get('id'),
    title: variant.get('title'),
    project: project(variant.related('project')),
    revenue_type: revenue_type(variant.related('revenue_type')),
    price_type: variant.get('price_type'),
    fixed_price: variant.get('fixed_price'),
    low_price: variant.get('low_price'),
    high_price: variant.get('high_price'),
    tax_rate: variant.get('tax_rate')
  }
}

const project = (project) => {
  if(!project.id) return null
  return {
    id: project.get('id'),
    title: project.get('title'),
    full_title: project.get('full_title'),
    integration: project.get('integration')
  }
}

const revenue_type = (revenue_type) => {
  if(!revenue_type.id) return null
  return {
    id: revenue_type.get('id'),
    title: revenue_type.get('title'),
    description: revenue_type.get('description'),
    full_title: revenue_type.get('full_title'),
    integration: revenue_type.get('integration')
  }
}

export default productSerializer
