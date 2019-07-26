import CheckSerializer from '../../../serializers/check_serializer'
import Check from '../../../models/check'

const showRoute = async (req, res) => {

  const check = await Check.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','line_items.project','line_items.expense_type','status','vendor','audit.story','audit.user.photo'],
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  res.status(200).respond(check, CheckSerializer)

}

export default showRoute
