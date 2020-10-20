import Variant from '../../../../models/variant'
import Store from '../../../../models/store'

const checkRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('code', req.params.store_code)
    qb.whereNull('deleted_at')
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const variant = await Variant.query(qb => {
    qb.select('stores_variants.*','stores_inventories.*')
    qb.innerJoin('stores_inventories','stores_inventories.variant_id','stores_variants.id')
    qb.innerJoin('stores_products','stores_products.id','stores_variants.product_id')
    qb.where('stores_variants.code', req.params.code)
    qb.where('stores_products.store_id', store.get('id'))
    qb.where('stores_products.is_active', true)
    qb.whereNull('stores_products.deleted_at')
  }).fetch({
    transacting: req.trx
  })

  const available = variant ? variant.get('inventory_onhand') : 0

  res.status(200).respond(available === null || available > 0)
}

export default checkRoute
