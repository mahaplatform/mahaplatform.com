import Migration from '../../../../../../../core/objects/migration'

const AddQuotedComment = new Migration({

  up: async (knex) => {

    await knex.schema.table('maha_device_values', (table) => {
      table.string('display')
    })

    const displays = [
      { id: 3, display: 'Desktop' },
      { id: 4, display: 'Mac OS X' },
      { id: 5, display: 'Chrome' },
      { id: 8, display: 'Windows' },
      { id: 9, display: 'Firefox' },
      { id: 11, display: 'Safari' },
      { id: 16, display: 'Mobile Phone' },
      { id: 17, display: 'iOS' },
      { id: 18, display: 'Safari' },
      { id: 27, display: 'Android' },
      { id: 30, display: 'Windows XP' },
      { id: 34, display: 'Tablet' },
      { id: 44, display: 'Samsung Browser' },
      { id: 46, display: 'Browser' },
      { id: 49, display: 'IE' },
      { id: 53, display: 'Edge' },
      { id: 58, display: 'Linux' },
      { id: 113, display: 'Chrome OS' },
      { id: 127, display: 'Opera' }
    ]

    await Promise.mapSeries(displays, async ({ id, display }) => {

      await knex('maha_device_values').where({ id }).update({ display } )

    })

  },

  down: async (knex) => {

    await knex.schema.table('maha_device_values', (table) => {
      table.dropColumn('display')
    })

  }

})

export default AddQuotedComment
