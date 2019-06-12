import AdvanceSerializer from '../../../serializers/advance_serializer'
import Advance from '../../../models/advance'

const showRoute = async (req, res) => {

  const advance = await Advance.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor','account'],
    transacting: req.trx
  })

  if(!advance) return req.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
  })

  res.status(200).respond(advance, (advance) => {
    return AdvanceSerializer(req, req.trx, advance)
  })

}

export default showRoute
