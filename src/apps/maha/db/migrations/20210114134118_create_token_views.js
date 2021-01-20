const CreateTokenViews = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create view crm_contact_tokens as
      select crm_contacts.id as contact_id,
      (
      jsonb_build_object('full_name', concat(crm_contacts.first_name,' ',crm_contacts.last_name)) ||
      jsonb_build_object('first_name', crm_contacts.first_name) ||
      jsonb_build_object('last_name', crm_contacts.last_name) ||
      jsonb_build_object('email', crm_email_addresses.address) ||
      jsonb_build_object('phone', crm_phone_numbers.number) ||
      jsonb_build_object('address', crm_mailing_addresses.address->>'description') ||
      jsonb_build_object('spouse', crm_contacts.spouse) ||
      jsonb_build_object('birthday', crm_contacts.birthday) ||
      jsonb_build_object('organization', crm_contacts.organization) ||
      jsonb_build_object('position', crm_contacts.position) ||
      jsonb_build_object('url', concat('https://mahaplatform.com/admin/crm/contacts/',crm_contacts.id)) ||
      jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/crm/contacts/',crm_contacts.id))
      ) as tokens
      from crm_contacts
      inner join crm_contact_primaries on crm_contact_primaries.contact_id=crm_contacts.id
      left join crm_email_addresses on crm_email_addresses.id=crm_contact_primaries.email_id
      left join crm_phone_numbers on crm_phone_numbers.id=crm_contact_primaries.phone_id
      left join crm_mailing_addresses on crm_mailing_addresses.id=crm_contact_primaries.address_id
    `)

    await knex.raw(`
      create view crm_program_tokens as
      with contacts as (
      select crm_contacts.id as contact_id,
      crm_contacts.team_id,
      values.key as code,
      values.value
      from crm_contacts,
      jsonb_each(crm_contacts.values) as values
      ),
      fields as (
      select maha_fields.team_id,
      maha_fields.parent_id as program_id,
      maha_fields.code,
      maha_fields.type,
      maha_fields.name->>'token' as token
      from maha_fields
      where maha_fields.parent_type='crm_programs'
      ),
      computed as (
      select contacts.contact_id,
      fields.program_id,
      fields.token,
      case
      when fields.type = 'addressfield' then contacts.value->'description'
      else contacts.value
      end as value
      from contacts
      inner join fields on fields.team_id=contacts.team_id and fields.code=contacts.code
      )
      select computed.contact_id,
      computed.program_id,
      jsonb_object_agg(token, value) as tokens
      from computed
      inner join crm_contacts on crm_contacts.id=computed.contact_id
      inner join crm_contact_primaries on crm_contact_primaries.contact_id=computed.contact_id
      left join crm_email_addresses on crm_email_addresses.id=crm_contact_primaries.email_id
      left join crm_phone_numbers on crm_phone_numbers.id=crm_contact_primaries.phone_id
      left join crm_mailing_addresses on crm_mailing_addresses.id=crm_contact_primaries.address_id
      group by computed.contact_id,
      computed.program_id
    `)

    await knex.raw(`
      create view crm_response_tokens as
      with responses as (
      select crm_responses.id as response_id,
      crm_responses.form_id,
      data.key as code,
      data.value
      from crm_responses,
      jsonb_each(crm_responses.data) as data
      ),
      fields as (
      select crm_forms.id as form_id,
      fields.value->>'code' as code,
      case
      when fields.value->>'type' = 'contactfield' then fields.value->'contactfield'->>'type'
      else fields.value->>'type'
      end as type,
      fields.value->'name'->>'token' as token
      from crm_forms,
      jsonb_array_elements(crm_forms.config->'fields') as fields
      ),
      computed as (
      select responses.response_id,
      fields.type,
      fields.token,
      case
      when fields.type = 'addressfield' then responses.value->'description'
      else responses.value
      end as value
      from responses
      inner join fields on responses.form_id=fields.form_id and responses.code=fields.code
      )
      select response_id,
      (
      jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/forms/forms/',crm_responses.form_id,'/responses/',computed.response_id)) ||
      jsonb_object_agg(token, value)
      ) as tokens
      from computed
      inner join crm_responses on crm_responses.id=computed.response_id
      group by response_id,form_id
    `)

    await knex.raw(`
      create view events_registration_tokens as
      with registrations as (
      select events_registrations.id as registration_id,
      events_registrations.event_id,
      data.key as code,
      data.value
      from events_registrations,
      jsonb_each(events_registrations.data) as data
      ),
      fields as (
      select null as event_id,
      codes.code as code,
      'textfield' as type,
      codes.code as token
      from ( select unnest(array['first_name','last_name','email']) as code) codes
      union
      select events_events.id as event_id,
      fields.value->>'code' as code,
      case
      when fields.value->>'type' = 'contactfield' then fields.value->'contactfield'->>'type'
      else fields.value->>'type'
      end as type,
      fields.value->'name'->>'token' as token
      from events_events,
      jsonb_array_elements(events_events.contact_config->'fields') as fields
      ),
      computed as (
      select registrations.registration_id,
      fields.token,
      case
      when fields.type = 'addressfield' then registrations.value->'description'
      else registrations.value
      end as value
      from registrations
      inner join fields on fields.code=registrations.code and (fields.event_id=registrations.event_id or fields.event_id is null)
      )
      select registration_id,
      (
      jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/events/events/',events_registrations.event_id,'/registrations/',computed.registration_id)) ||
      jsonb_object_agg(token, value)
      ) as tokens
      from computed
      inner join events_registrations on events_registrations.id=computed.registration_id
      group by registration_id,event_id

    `)

    await knex.raw(`
      create view stores_order_tokens as
      with orders as (
      select stores_orders.id as order_id,
      stores_orders.store_id,
      data.key as code,
      data.value
      from stores_orders,
      jsonb_each(stores_orders.data) as data
      ),
      fields as (
      select null as store_id,
      codes.code as code,
      'textfield' as type,
      codes.code as token
      from ( select unnest(array['first_name','last_name','email']) as code) codes
      union
      select stores_stores.id as store_id,
      fields.value->>'code' as code,
      case
      when fields.value->>'type' = 'contactfield' then fields.value->'contactfield'->>'type'
      else fields.value->>'type'
      end as type,
      fields.value->'name'->>'token' as token
      from stores_stores,
      jsonb_array_elements(stores_stores.contact_config->'fields') as fields
      ),
      computed as (
      select orders.order_id,
      fields.token,
      case
      when fields.type = 'addressfield' then orders.value->'description'
      else orders.value
      end as value
      from orders
      inner join fields on fields.code=orders.code and (fields.store_id=orders.store_id or fields.store_id is null)
      )
      select order_id,
      (
      jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/stores/stores/',stores_orders.store_id,'/orders/',computed.order_id)) ||
      jsonb_object_agg(token, value)
      ) as tokens
      from computed
      inner join stores_orders on stores_orders.id=computed.order_id
      group by order_id,store_id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateTokenViews
