import socket from '../../../../../core/services/routes/emitter'
import Adjustment from '../../../models/adjustment'
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

    const { inventory_instock, inventory_policy } = req.body.inventory[variant_id]

    const variant = await Variant.query(qb => {
      qb.select('stores_variants.*','stores_inventories.*')
      qb.innerJoin('stores_inventories','stores_inventories.variant_id','stores_variants.id')
      qb.innerJoin('stores_products','stores_products.id','stores_variants.product_id')
      qb.where('stores_products.store_id', store.get('id'))
      qb.where('stores_variants.id', variant_id)
    }).fetch({
      transacting: req.trx
    })

    if(inventory_policy !== variant.get('inventory_policy')) {
      await variant.save({
        inventory_policy
      },{
        transacting: req.trx,
        patch: true
      })
    }

    if(inventory_instock !== variant.get('inventory_instock')) {
      await Adjustment.forge({
        team_id: variant.get('team_id'),
        variant_id: variant.get('id'),
        quantity: inventory_instock - variant.get('inventory_instock')
      }).save(null, {
        transacting: req.trx
      })
    }

  })

  await socket.refresh(req, [
    `/admin/stores/stores/${store.get('id')}`
  ])

  res.status(200).respond(true)

}

export default inventoryRoute
