import { knex, Route } from 'maha'

const routeCreator = (is_published) => {

  const processor = async (req, trx, options) => {

    await knex('sites_items').transacting(trx).where('id', req.params.id).update({
      is_published
    })

    return true

  }

  const refresh = (req, trx, result, options) => [
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`
  ]

  return new Route({
    method: 'patch',
    path: is_published ? '/publish' : '/unpublish',
    processor,
    refresh
  })

}


export default routeCreator
