import RecipientSerializer from '../../../serializers/recipient_serializer'
import { getRecipients } from '../../../services/recipients'

const getStrategy = ({ $filter, contact_ids, list_id, filter_id }) => {
  if(contact_ids) return 'contacts'
  if(list_id) return 'list'
  if(filter_id) return 'filter'
  return 'criteria'
}

const recipientsRoute = async (req, res) => {

  const { $filter, contact_ids, list_id, filter_id } = req.query

  const recipients = await getRecipients(req, {
    strategy: getStrategy(req.query),
    type: req.params.type,
    purpose: req.params.purpose,
    program_id: req.params.id,
    config: {
      filter: $filter,
      contact_ids,
      list_id,
      filter_id
    },
    page: req.query.$page
  })

  res.status(200).respond(recipients, RecipientSerializer)

}

export default recipientsRoute
