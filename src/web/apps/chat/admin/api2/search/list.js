import ResultSerializer from '../../../serializers/result_serializer'
import Result from '../../../models/result'

const listRoute = async (req, res) => {

  const results = await Result.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['text']
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['id','first_name','last_name','email']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['channel.owner.photo','channel.subscriptions.user.photo','channel.last_message','message.attachments.asset.source','message.attachments.service','message.message_type','message.user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(results, (result) => {
    return ResultSerializer(req, req.trx, result)
  })

}

export default listRoute
