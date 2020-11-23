import ResultSerializer from '@apps/chat/serializers/result_serializer'
import Result from '@apps/chat/models/result'

const listRoute = async (req, res) => {

  const results = await Result.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('user_id', req.user.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['text']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-date',
      allowed: ['id','first_name','last_name','email','date']
    },
    page: req.query.$page,
    withRelated: ['channel.owner.photo','channel.subscriptions.user.photo','channel.last_message','message.attachments.asset','message.attachments.service','message.message_type','message.user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(results, ResultSerializer)

}

export default listRoute
