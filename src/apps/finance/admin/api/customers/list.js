import CustomerSerializer from '../../../serializers/customer_serializer'
import Customer from '../../../models/customer'

const listRoute = async (req, res) => {

  const customers = await Customer.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['code']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['last_name'],
    sortParams: ['id','last_name','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(customers, CustomerSerializer)

}

export default listRoute
