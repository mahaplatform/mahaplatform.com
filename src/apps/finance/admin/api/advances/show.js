import AdvanceSerializer from '@apps/finance/serializers/advance_serializer'
import Advance from '@apps/finance/models/advance'

const showRoute = async (req, res) => {

  const advance = await Advance.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project.members','expense_type','audit.story','audit.user.photo'],
    transacting: req.trx
  })

  if(!advance) return res.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
  })

  await res.status(200).respond(advance, AdvanceSerializer)

}

export default showRoute
