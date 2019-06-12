import CheckSerializer from '../../../serializers/check_serializer'
import Check from '../../../models/check'

const showRoute = async (req, res) => {

  const check = await Check.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor'],
    transacting: req.trx
  })

  if(!check) return req.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  res.status(200).respond(check, (check) => {
    return CheckSerializer(req, req.trx, check)
  })

}

export default showRoute
