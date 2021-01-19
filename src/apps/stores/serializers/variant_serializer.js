const variantSerializer = (req, result) => ({
  id: result.get('id'),
  price_type: result.get('price_type'),
  project_id: result.get('project_id'),
  revenue_type_id: result.get('revenue_type_id'),
  fixed_price: result.get('fixed_price'),
  low_price: result.get('low_price'),
  high_price: result.get('high_price'),
  tax_rate: result.get('tax_rate'),
  overage_strategy: result.get('overage_strategy'),
  donation_revenue_type_id: result.get('donation_revenue_type_id'),
  is_tax_deductable: result.get('is_tax_deductable'),
  inventory_policy: result.get('inventory_policy'),
  max_per_order: result.get('max_per_order'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default variantSerializer
