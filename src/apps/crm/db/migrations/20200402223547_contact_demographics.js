const ContactDemographics = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_contacts', (table) => {
      table.enum('gender', ['female','male','other'], { useNative: true, enumName: 'crm_contacts_gender' })
      table.enum('ethnicity', ['hispanic','non_hispanic'], { useNative: true, enumName: 'crm_contacts_ethnicity' })
    })

    await knex.schema.createTable('crm_contact_races', (table) => {
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.enum('race', ['caucasion','african','american_indian','asian','pacific_islander','other'], { useNative: true, enumName: 'crm_contact_races_race' })
    })
  },

  down: async (knex) => {
  }

}

export default ContactDemographics
