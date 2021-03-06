import CustomerSerializer from '@apps/finance/serializers/customer_serializer'
import Customer from '@apps/finance/models/customer'

const listRoute = async (req, res) => {

  const customers = await Customer.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['last_name'],
      allowed: ['id','last_name','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(customers, CustomerSerializer)

}

export default listRoute
