import SenderSerializer from '../../../serializers/sender_serializer'
import Sender from '../../../models/sender'

const listRoute = async (req, res) => {

  const senders = await Sender.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(senders, SenderSerializer)

}

export default listRoute
