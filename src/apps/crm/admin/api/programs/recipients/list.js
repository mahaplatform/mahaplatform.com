import RecipientSerializer from '../../../../serializers/recipient_serializer'
import { getRecipients } from '../../../../services/recipients'

const listRoute = async (req, res) => {

  const recipients = await getRecipients(req, {
    strategy: 'criteria',
    type: req.params.type,
    purpose: req.params.purpose,
    program_id: req.params.program_id,
    filter: req.query.$filter,
    page: req.query.$page
  })

  res.status(200).respond(recipients, RecipientSerializer)

}

export default listRoute
