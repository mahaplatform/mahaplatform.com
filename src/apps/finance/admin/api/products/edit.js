import Product from '../../../models/product'

const editRoute = async (req, res) => {

  const product = await Product.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!product) return res.status(404).respond({
    code: 404,
    message: 'Unable to load product'
  })

  res.status(200).respond(product, (req, product) => ({
    title: product.get('title'),
    project_id: product.get('project_id'),
    revenue_type_id: product.get('revenue_type_id'),
    price_type: product.get('price_type'),
    fixed_price: product.get('fixed_price'),
    low_price: product.get('low_price'),
    high_price: product.get('high_price'),
    tax_rate: product.get('tax_rate') ? product.get('tax_rate') * 100 : null,
    overage_strategy: product.get('overage_strategy'),
    donation_revenue_type_id: product.get('donation_revenue_type_id'),
    is_tax_deductible: product.get('is_tax_deductible')
  }))

}

export default editRoute
