import { enrollInWorkflows } from '@apps/automation/services/workflows'

const addToLists = async (req, { contact, list_ids }) => {

  await Promise.mapSeries(list_ids, async (list_id) => {

    await req.trx('crm_subscriptions').insert({
      contact_id: contact.get('id'),
      list_id
    })

    await enrollInWorkflows(req, {
      contact,
      trigger_type: 'subscription_created',
      list_id
    })

  })

}

export default addToLists
