import { addIndex } from '@apps/sites/services/search'
import Field from '@apps/maha/models/field'

import Item from '@apps/sites/models/item'

const AddIndex = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('sites_items', (table) => {
      table.text('index')
    })

    const fields = await Field.query(qb => {
      qb.where('parent_type', 'sites_types')
      qb.orderBy(['parent_id','delta'])
    }).fetchAll({
      transacting: knex
    })

    const map = fields.reduce((map, field) => ({
      ...map,
      [field.get('parent_id')]: [
        ...map[field.get('parent_id')] || [],
        field
      ]
    }), {})

    const items = await Item.fetchAll({
      transacting: knex
    }).then(result => result.toArray())

    await Promise.mapSeries(items, async(item) => {
      await addIndex(item, map, knex)
    })

  },

  down: async (knex) => {

    await knex.schema.table('sites_items', (table) => {
      table.dropColumn('index')
    })

  }

}

export default AddIndex
