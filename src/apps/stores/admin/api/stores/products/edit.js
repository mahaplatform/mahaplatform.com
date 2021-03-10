import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'

const editRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.store_id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const product = await Product.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('store_id', store.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['categories'],
    transacting: req.trx
  })

  if(!product) return res.status(404).respond({
    code: 404,
    message: 'Unable to load product'
  })

  await res.status(200).respond(product, (req, product) => ({
    store_id: product.get('store_id'),
    title: product.get('title'),
    category_ids: product.related('categories').map(category => category.get('id')),
    description: product.get('description')    
  }))

}

export default editRoute
