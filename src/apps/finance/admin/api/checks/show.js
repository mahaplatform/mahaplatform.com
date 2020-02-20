import CheckSerializer from '../../../serializers/check_serializer'
import Check from '../../../models/check'

const showRoute = async (req, res) => {

  const check = await Check.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','allocations.project','allocations.expense_type','vendor','audit.story','audit.user.photo'],
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  res.status(200).respond(check, CheckSerializer)

}

export default showRoute
