import ContactSerializer from '../../../serializers/contact_serializer'
import { getRecipients } from '../../../services/recipients'

const listRoute = async (req, res) => {

  const contacts = await getRecipients(req, {
    filter: req.query.$filter,
    page: req.query.$page
  })

  res.status(200).respond(contacts, ContactSerializer)

}

export default listRoute
