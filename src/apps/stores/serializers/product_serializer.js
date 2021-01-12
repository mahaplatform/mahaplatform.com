const productSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  slug: result.get('slug'),
  title: result.get('title'),
  type: result.get('type'),
  description: result.get('description'),
  variants: result.related('variants').map(variant),
  options: result.get('options'),
  categories: result.related('categories').map(categories),
  is_active: result.get('is_active'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const categories = (category) => {
  if(!category.id) return null
  return {
    id: category.get('id'),
    title: category.get('title')
  }
}

const variant = (variant) => {
  if(!variant.id) return null
  return {
    id: variant.get('id'),
    code: variant.get('code'),
    title: variant.get('title'),
    project: project(variant.related('project')),
    revenue_type: revenue_type(variant.related('revenue_type')),
    price_type: variant.get('price_type'),
    fixed_price: variant.get('fixed_price'),
    low_price: variant.get('low_price'),
    high_price: variant.get('high_price'),
    tax_rate: variant.get('tax_rate'),
    donation_revenue_type: revenue_type(variant.related('donation_revenue_type')),
    is_tax_deductable: variant.get('is_tax_deductable'),
    max_per_order: variant.get('max_per_order'),
    inventory_policy: variant.get('inventory_policy'),
    inventory_instock: variant.get('inventory_instock'),
    inventory_onhand: variant.get('inventory_onhand'),
    inventory_reserved: variant.get('inventory_reserved'),
    inventory_unfulfilled: variant.get('inventory_unfulfilled'),
    options: variant.get('options'),
    photos: variant.related('photos').map(photo),
    shipping_strategy: variant.get('shipping_strategy'),
    shipping_fee: variant.get('shipping_fee'),
    is_active: variant.get('is_active')
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

const photo = (photo) => {
  if(!photo.id) return null
  return {
    id: photo.get('id'),
    asset: asset(photo.related('asset'))
  }
}

const asset = (asset) => {
  if(!asset.id) return null
  return {
    id: asset.get('id'),
    path: asset.get('path'),
    signed_url: asset.get('signed_url')
  }
}

export default productSerializer
