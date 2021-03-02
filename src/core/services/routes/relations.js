import knex from '@core/vendor/knex'
import _ from 'lodash'

export const updateRelated = async (req, options) => {

  const { object, related, table, ids, foreign_key, related_foreign_key } = options

  const primary_key = options.primary_key || 'id'

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

  if(remove_ids.length > 0) await knex(table).transacting(req.trx).where({
    [foreign_key]: object.get(primary_key)
  }).whereIn(related_foreign_key, remove_ids).delete()

  if(add_ids.length > 0) await knex(table).transacting(req.trx).insert(add_ids.map(id => ({
    [foreign_key]: object.get(primary_key),
    [related_foreign_key]: id
  })))

}
