import ScholarshipSerializer from '../../../../serializers/scholarship_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import Scholarship from '../../../../models/scholarship'
import Customer from '../../../../models/customer'

const createRoute = async (req, res) => {

  const customer = await Customer.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.customer_id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const scholarship = await Scholarship.forge({
    team_id: req.team.get('id'),
    customer_id: customer.get('id'),
    ...whitelist(req.body, ['program_id','description','amount'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: scholarship
  })

  res.status(200).respond(scholarship, ScholarshipSerializer)

}

export default createRoute
