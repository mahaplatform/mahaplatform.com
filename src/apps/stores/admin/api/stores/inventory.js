import Variant from '../../../models/variant'
import Store from '../../../models/store'

const inventoryRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  await Promise.mapSeries(Object.keys(req.body.inventory), async (variant_id) => {

    const variant = await Variant.query(qb => {
      qb.innerJoin('stores_products','stores_products.id','stores_variants.product_id')
      qb.where('stores_products.store_id', store.get('id'))
      qb.where('stores_variants.id', variant_id)
    }).fetch({
      transacting: req.trx
    })

    await variant.save({
      inventory_policy: req.body.inventory[variant_id].inventory_policy,
      inventory_quantity: req.body.inventory[variant_id].inventory_quantity
    },{
      transacting: req.trx,
      patch: true
    })

  })

  res.status(200).respond(true)

}

export default inventoryRoute
