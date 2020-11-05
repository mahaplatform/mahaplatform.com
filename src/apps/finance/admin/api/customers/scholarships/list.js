import ScholarshipSerializer from '@apps/finance/serializers/scholarship_serializer'
import Scholarship from '@apps/finance/models/scholarship'
import Customer from '@apps/finance/models/customer'

const listRoute = async (req, res) => {

  const customer = await Customer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.customer_id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const scholarships = await Scholarship.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('customer_id', customer.get('id'))
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(scholarships, ScholarshipSerializer)

}

export default listRoute
