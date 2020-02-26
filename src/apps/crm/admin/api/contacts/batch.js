import { updateRelated } from '../../../../../core/services/routes/relations'
import { getContacts } from '../../../services/contacts'

const batchRoute = async (req, res) => {

  const contacts = await getContacts(req, {
    filter: req.body.filter
  }).then(result => result.toArray())

  const relations = {
    topics: { related: 'topics', table: 'crm_interests', related_foreign_key: 'topic_id' },
    lists: { related: 'lists', table: 'crm_subscriptions', related_foreign_key: 'list_id' },
    tags: { related: 'tags', table: 'crm_taggings', related_foreign_key: 'tag_id' }
  }

  const relation = relations[req.body.type]

  await Promise.mapSeries(contacts, async (contact) => {
    await updateRelated(req, {
      related: relation.related,
      table: relation.table,
      object: contact,
      ids: req.body.ids,
      foreign_key: 'contact_id',
      related_foreign_key: relation.related_foreign_key
    })
  })

  res.status(200).respond(true)

}

export default batchRoute
