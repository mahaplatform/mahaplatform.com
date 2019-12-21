import Product from '../../../models/product'

const editRoute = async (req, res) => {

  const product = await Product.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!product) return res.status(404).respond({
    code: 404,
    message: 'Unable to load product'
  })

  res.status(200).respond(product, {
    fields: [
      'id',
      'title',
      'project_id',
      'revenue_type_id',
      'price',
      'tax_rate',
      'is_tax_deductible'
    ]
  })

}

export default editRoute
