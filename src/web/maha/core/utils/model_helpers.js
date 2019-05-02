import _ from 'lodash'
import BackframeError from '../packages/backframe'

export const updateRelated = (related, table, param, result_key, foreign_key) => async (req, trx, result, options) => {

  const body_ids = _.get(req, `body.${param}`)

  if(!body_ids) return

  try {

    await result.load([related], { transacting: trx })

    const ids = result.related(related).map(item => item.id)

    const remove_ids = ids.filter(id => !_.includes(body_ids, id))

    const add_ids = body_ids.filter(id => !_.includes(ids, id))

    if(remove_ids) await options.knex(table).transacting(trx).where({
      [result_key]: result.get('id')
    }).whereIn(foreign_key, remove_ids).delete()

    if(add_ids) await options.knex(table).transacting(trx).insert(add_ids.map(id => ({
      [result_key]: result.get('id'),
      [foreign_key]: id
    })))

  } catch(err) {

    if(err.errors) {

      throw new BackframeError({
        code: 422,
        message: 'Unable to update related',
        errors: err.toJSON()
      })

    }

    throw err

  }

}
