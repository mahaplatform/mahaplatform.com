const AddNameToProfile = {

  up: async (knex) => {

    const googledrive = await knex('maha_sources').insert({ text: 'googledrive' }).returning('id')
    await knex('maha_sources').insert([
      { text: 'facebookphotos' },
      { text: 'googlephotos' },
      { text: 'googlecontacts' },
      { text: 'onedrive' },
      { text: 'outlookcontacts' },
      { text: 'constantcontact' },
      { text: 'mailchimp' },
      { text: 'twitter' },
      { text: 'outlook' },
      { text: 'gmail' }
    ])

    await knex.schema.dropTable('maha_profiles')

    await knex.schema.createTable('maha_profiles', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('source_id').unsigned()
      table.foreign('source_id').references('maha_sources.id')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.string('profile_id')
      table.string('name')
      table.string('username')
      table.enum('type', ['files','photos','contacts','emails','posts','events'], { useNative: true, enumName: 'maha_profiles_type' })
      table.jsonb('data')
      table.timestamps()
    })

    await knex('maha_assets').where({
      source_id: 5
    }).update({
      source_id: googledrive[0]
    })

    await knex('maha_sources').where({
      id: 5
    }).del()

  },

  down: async (knex) => {
  }

}

export default AddNameToProfile
