import ScholarshipSerializer from '../../../../serializers/scholarship_serializer'
import Scholarship from '../../../../models/scholarship'
import Customer from '../../../../models/customer'

const listRoute = async (req, res) => {

  const customer = await Customer.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.customer_id)
  }).fetch({
    withRelated: [],
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const scholarships = await Scholarship.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', customer.get('id'))
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(scholarships, ScholarshipSerializer)

}

export default listRoute
