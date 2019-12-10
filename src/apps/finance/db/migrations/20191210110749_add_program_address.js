const AddProgramAddress = {

  up: async (knex) => {

    const tompkins = '615 Willow Ave\nIthaca, NY 14850'

    const niagara = '4487 Lake Avenue\nLockport, New York 14094'

    await knex.schema.table('maha_teams', (table) => {
      table.text('address')
    })

    await knex.schema.table('crm_programs', (table) => {
      table.text('address')
    })

    await knex('maha_teams').where('id', 1).update({ address: tompkins })

    await knex('maha_teams').where('id', 7).update({ address: niagara })

    await knex('crm_programs').update({ address: tompkins })

  },

  down: async (knex) => {
  }

}

export default AddProgramAddress
