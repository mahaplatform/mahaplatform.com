const cartSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  discount: discount(result.related('discount')),
  items: result.related('items').map(item),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const item = (item) => {
  const variant = item.related('variant')
  const product = variant.related('product')
  return {
    code: variant.get('code'),
    title: product.get('title'),
    description: product.get('description'),
    // project: project(variant.related('project')),
    // revenue_type: revenue_type(variant.related('revenue_type')),
    price_type: variant.get('price_type'),
    fixed_price: variant.get('fixed_price'),
    low_price: variant.get('low_price'),
    high_price: variant.get('high_price'),
    tax_rate: variant.get('tax_rate'),
    // donation_revenue_type: revenue_type(variant.related('donation_revenue_type')),
    is_tax_deductable: variant.get('is_tax_deductable'),
    max_per_order: variant.get('max_per_order'),
    inventory_policy: variant.get('inventory_policy'),
    inventory_instock: variant.get('inventory_instock'),
    inventory_onhand: variant.get('inventory_onhand'),
    inventory_reserved: variant.get('inventory_reserved'),
    inventory_unfulfilled: variant.get('inventory_unfulfilled'),
    options: variant.get('options'),
    // media: variant.related('media').map(media),
    shipping_strategy: variant.get('shipping_strategy'),
    shipping_fee: variant.get('shipping_fee'),
    price: item.get('price'),
    quantity: item.get('quantity')
  }
}

const discount = (discount) => {
  if(!discount.id) return
  return {
    id: discount.get('id'),
    code: discount.get('code'),
    type: discount.get('type'),
    amount: discount.get('amount'),
    percent: discount.get('percent'),
    applies_to: discount.get('applies_to'),
    applies_once: discount.get('applies_once'),
    minimum_requirements: discount.get('minimum_requirements'),
    minimum_amount: discount.get('minimum_amount'),
    minimum_quantity: discount.get('minimum_quantity'),
    starts_at: discount.get('starts_at'),
    ends_at: discount.get('ends_at')
  }
}

export default cartSerializer
