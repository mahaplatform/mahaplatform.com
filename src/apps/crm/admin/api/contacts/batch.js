import { getContacts } from '../../../services/contacts'
import { addToLists } from '../../../services/lists'
import { addToTopics } from '../../../services/topics'
import _ from 'lodash'

const getType = (type) => {
  if(type === 'lists') return { foreign_key: 'list_ids', fn: addToLists }
  if(type === 'topics') return { foreign_key: 'topic_ids', fn: addToTopics }
}

const addToItem = async (req, params) => {
  const { contact, ids } = params
  const type = getType(params.type)
  const existing_ids = contact.related(params.type).map(item => {
    return item.get('id')
  })
  const add_ids = ids.filter(id => {
    return !_.includes(existing_ids, id)
  })
  if(add_ids.length === 0) return
  await type.fn(req, {
    contact,
    [type.foreign_key]: add_ids
  })
}

const batchRoute = async (req, res) => {

  const contacts = await getContacts(req, {
    filter: req.body.filter,
    withRelated: ['lists','topics']
  }).then(result => result.toArray())

  await Promise.mapSeries(contacts, async (contact) => {
    await addToItem(req, {
      contact,
      type: req.body.type,
      ids: req.body.ids
    })
  })

  res.status(200).respond(true)

}

export default batchRoute
