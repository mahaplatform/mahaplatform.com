import { enrollInWorkflows } from '@apps/automation/services/workflows'

const addToLists = async (req, { contact, list_ids }) => {

  await Promise.mapSeries(list_ids, async (list_id) => {

    const subscription = await req.trx('crm_subscriptions').where(qb => {
      qb.where('contact_id', contact.get('id'))
      qb.where('list_id', list_id)
    }).then(results => results[0])

    if(subscription) return

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
