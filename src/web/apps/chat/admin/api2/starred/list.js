import MessageSerializer from '../../../serializers/message_serializer'
import Message from '../../../models/message'

const listRoute = async (req, res) => {

  const messages = await Message.query(qb => {
    qb.joinRaw('inner join "maha_stars" on "maha_stars"."starrable_type"=\'chat_messages\' and "maha_stars"."starrable_id"="chat_messages"."id"')
    qb.where('maha_stars.user_id', req.user.get('id'))
  }).scope({
    team: req.team,
    user: req.user
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['id','first_name','last_name','email']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['attachments.asset.source','attachments.service','message_type','user.photo','reactions.user.photo','stars'],
    transacting: req.trx
  })

  res.status(200).respond(messages, (message) => {
    return MessageSerializer(req, req.trx, message)
  })

}

export default listRoute
