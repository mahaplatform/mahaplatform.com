import { Migration } from 'maha'

const AddFileName = new Migration({

  up: async (knex) => {
    
    await knex.schema.table('drive_files', (table) => {
      table.string('file_name')
    })
    
  },

  down: async (knex) => {
    
    await knex.schema.table('drive_files', (table) => {
      table.dropColumn('file_name')
    })    
    
  }

})

export default AddFileName
