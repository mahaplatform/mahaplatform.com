const NotesAttachments = {

  up: async (knex) => {
    await knex.schema.createTable('crm_notes_assets', (table) => {
      table.integer('note_id').unsigned()
      table.foreign('note_id').references('crm_contact_notes.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
    })
    await knex.schema.createTable('crm_calls_assets', (table) => {
      table.integer('note_id').unsigned()
      table.foreign('note_id').references('crm_contact_notes.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
    })

    const notes = await knex('crm_activities').whereNotNull('contact_note_id')
    await Promise.mapSeries(notes, async (note) => {
      await knex('crm_activities').where('id', note.id).update({
        data: {
          note_id: note.contact_note_id
        }
      })
    })

    const calls = await knex('crm_activities').whereNotNull('contact_call_id')
    await Promise.mapSeries(calls, async (call) => {
      await knex('crm_activities').where('id', call.id).update({
        data: {
          call_id: call.contact_call_id
        }
      })
    })

    await knex.schema.table('crm_activities', (table) => {
      table.dropColumn('contact_note_id')
      table.dropColumn('contact_call_id')
      table.dropColumn('contact_email_id')
    })


  },

  down: async (knex) => {
  }

}

export default NotesAttachments
