import RecipientSerializer from '@apps/campaigns/serializers/recipient_serializer'
import { getRecipients } from '@apps/campaigns/services/recipients'

const getStrategy = ({ $filter, contact_ids, filter_id, list_id, topic_id }) => {
  if($filter && $filter.q !== undefined) return 'lookup'
  if(contact_ids) return 'contacts'
  if(list_id) return 'list'
  if(topic_id) return 'topic'
  if(filter_id) return 'filter'
  return 'criteria'
}

const recipientsRoute = async (req, res) => {

  const { $filter, contact_ids, filter_id, list_id, topic_id } = req.query

  const recipients = await getRecipients(req, {
    strategy: getStrategy(req.query),
    type: req.params.type,
    purpose: req.params.purpose,
    program_id: req.params.id,
    config: {
      filter: $filter,
      contact_ids,
      list_id,
      topic_id,
      filter_id
    },
    page: req.query.$page
  })

  await res.status(200).respond(recipients, RecipientSerializer)

}

export default recipientsRoute
