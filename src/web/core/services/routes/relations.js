import knex from '../knex'
import _ from 'lodash'

export const updateRelated = async (req, options) => {

  const { object, related, table, ids, primary_key, foreign_key } = options

  if(!ids) return

  await object.load(related, {
    transacting: req.trx
  })

  const existing_ids = object.related(related).toArray().map(item => {
    return item.id
  })

  const remove_ids = existing_ids.filter(id => {
    return !_.includes(ids, id)
  })

  const add_ids = ids.filter(id => {
    return !_.includes(existing_ids, id)
  })

  console.log(ids, existing_ids, remove_ids, add_ids)

  if(remove_ids.length > 0) await knex(table).transacting(req.trx).where({
    [primary_key]: object.get('id')
  }).whereIn(foreign_key, remove_ids).delete()

  if(add_ids.length > 0) await knex(table).transacting(req.trx).insert(add_ids.map(id => ({
    [primary_key]: object.get('id'),
    [foreign_key]: id
  })))

}
