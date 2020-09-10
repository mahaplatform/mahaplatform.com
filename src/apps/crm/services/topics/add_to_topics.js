import { enrollInWorkflows } from '../workflows'

const addToTopics = async (req, { contact, topic_ids }) => {

  await Promise.mapSeries(topic_ids, async (topic_id) => {

    await req.trx('crm_interests').insert({
      contact_id: contact.get('id'),
      topic_id
    })

    await enrollInWorkflows(req, {
      contact,
      trigger_type: 'topic',
      action: 'add',
      topic_id
    })

  })

}

export default addToTopics
