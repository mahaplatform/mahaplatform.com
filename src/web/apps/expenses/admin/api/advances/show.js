import AdvanceSerializer from '../../../serializers/advance_serializer'
import Advance from '../../../models/advance'

const showRoute = async (req, res) => {

  const advance = await Advance.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: [
      'user','project.members','expense_type','status',
      { audit: qb => qb.orderBy('created_at', 'asc') },'audit.story','audit.user.photo'
    ],
    transacting: req.trx
  })

  if(!advance) return req.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
  })

  res.status(200).respond(advance, AdvanceSerializer)

}

export default showRoute
