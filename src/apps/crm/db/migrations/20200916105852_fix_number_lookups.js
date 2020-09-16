const FixNumberLookups = {

  up: async (knex) => {
    const contacts = [
      { id: 14799, first_name: 'Lisa', last_name: 'Siegard' },
      { id: 14792, first_name: 'Tammie', last_name: 'Minturn' },
      { id: 14789, first_name: 'Debr', last_name: 'Walawender' },
      { id: 14788, first_name: 'Valerie', last_name: 'Milton' },
      { id: 14787, first_name: 'Dean', last_name: 'Christophe' },
      { id: 14786, first_name: 'Rebecca', last_name: 'Atnip' },
      { id: 14783, first_name: 'Kathy', last_name: 'Seymour' },
      { id: 14803, first_name: 'Xin', last_name: 'Nie' }
    ]
    await Promise.mapSeries(contacts, async(contact) => {
      await knex('crm_contacts').where('id', contact.id).update({
        first_name: contact.first_name,
        last_name: contact.last_name
      })
    })
    await knex('crm_workflow_enrollments').whereIn('id', [32695, 32696]).update({
      contact_id: 14803
    })
    await knex('crm_activities').whereIn('id', [55881, 55882]).update({
      contact_id: 14803
    })
  },

  down: async (knex) => {
  }

}

export default FixNumberLookups
