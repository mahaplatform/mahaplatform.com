const CreateAccount = {

  up: async (knex) => {

    await knex.schema.createTable('maha_accounts', (table) => {
      table.increments('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('cell_phone')
      table.string('password_salt')
      table.string('password_hash')
      table.integer('security_question_id').unsigned()
      table.foreign('security_question_id').references('maha_security_questions.id')
      table.string('security_question_answer')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.boolean('use_twofactor')
      table.boolean('is_blocked')
      table.timestamp('invalidated_at')
      table.timestamp('locked_out_at')
      table.timestamp('activated_at')
      table.timestamp('reset_at')
      table.timestamps()
    })

    await knex.schema.table('maha_users', table => {
      table.integer('account_id').unsigned()
      table.foreign('account_id').references('maha_accounts.id')
    })

    await knex.schema.table('maha_teams', table => {
      table.dropColumn('color')
      table.dropColumn('authentication_strategy')
      table.dropColumn('authentication_config')
    })

    await knex.schema.dropTable('maha_users_alerts')

    await knex.schema.dropTable('maha_alerts')

    await Promise.mapSeries([
      { from: 'mochini@gmail.com', to: 'gmk8@cornell.edu' },
      { from: 'jaymepeck@gmail.com', to: 'jp2539@cornell.edu' }
    ], async({ from, to }) => {
      await knex('maha_users').where('email', from).update('email', to)
    })

    const users = await knex('maha_users').orderBy('id','asc')

    const getAccount = async (user) => {
      const account = await knex('maha_accounts').where('email', user.email).then(results => results[0])
      if(account) return account
      const newaccount = await knex('maha_accounts').insert({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        cell_phone: user.cell_phone,
        password_salt: user.password_salt,
        password_hash: user.password_hash,
        security_question_id: user.security_question_id,
        security_question_answer: user.security_question_answer,
        photo_id: user.photo_id,
        use_twofactor: false,
        is_blocked: user.is_blocked,
        invalidated_at: user.invalidated_at,
        locked_out_at: user.locked_out_at,
        activated_at: user.activated_at,
        reset_at: user.reset_at,
        created_at: user.created_at,
        updated_at: user.updated_at
      }).returning('*').then(result => result[0])
      return newaccount
    }

    await Promise.mapSeries(users, async(user) => {
      const account = await getAccount(user)
      await knex('maha_users').where('id', user.id).update({
        account_id: account.id,
        photo_id: account.photo_id
      })
    })

    await knex.schema.table('maha_users', table => {
      table.dropColumn('password_salt')
      table.dropColumn('password_hash')
      table.dropColumn('security_question_id')
      table.dropColumn('security_question_answer')
      table.dropColumn('key')
      table.dropColumn('unread')
      table.dropColumn('invalidated_at')
      table.dropColumn('secondary_email')
      table.dropColumn('is_blocked')
      table.dropColumn('locked_out_at')
      table.dropColumn('reset_at')

    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_accounts')
  }

}

export default CreateAccount
