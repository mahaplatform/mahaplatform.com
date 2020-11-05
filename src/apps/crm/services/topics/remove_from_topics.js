import { enrollInWorkflows } from '@apps/automation/services/workflows'

const removeFromTopics = async (req, { contact, topic_ids }) => {

  await Promise.mapSeries(topic_ids, async(topic_id) => {

    await req.trx('crm_interests').where({
      contact_id: contact.get('id'),
      topic_id
    }).delete()

    await enrollInWorkflows(req, {
      contact,
      trigger_type: 'topic',
      action: 'remove',
      topic_id
    })

  })

}

export default removeFromTopics
