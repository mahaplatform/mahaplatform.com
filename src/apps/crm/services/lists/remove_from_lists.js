import { enrollInWorkflows } from '@apps/automation/services/workflows'

const removeFromLists = async (req, { contact, list_ids }) => {

  await Promise.mapSeries(list_ids, async(list_id) => {

    await req.trx('crm_subscriptions').where({
      contact_id: contact.get('id'),
      list_id
    }).delete()

    await enrollInWorkflows(req, {
      contact,
      trigger_type: 'subscription_deleted',
      list_id
    })

  })

}

export default removeFromLists
