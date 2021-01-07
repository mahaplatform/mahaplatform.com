const CreateDuplicates = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
    create view crm_duplicates as
    select distinct on (crm_contacts.id,duplicate_id)
    crm_contacts.id as contact_id,
    case
    when pn2.contact_id is not null then pn2.contact_id
    when ma2.contact_id is not null then ma2.contact_id
    end as duplicate_id
    from crm_contacts
    inner join crm_phone_numbers pn1 on pn1.contact_id=crm_contacts.id
    left join crm_phone_numbers pn2 on pn2.number=pn1.number and pn2.team_id=pn1.team_id and pn2.contact_id!=crm_contacts.id and pn2.id != pn1.id
    inner join crm_mailing_addresses ma1 on ma1.contact_id=crm_contacts.id
    left join crm_mailing_addresses ma2 on ma2.address->>'description'=ma1.address->>'description' and ma2.team_id=ma1.team_id and ma2.contact_id!=crm_contacts.id and ma2.id != ma1.id
    where pn2.id is not null or ma2.id is not null
    `)
  },

  down: async (knex) => {
  }

}

export default CreateDuplicates
