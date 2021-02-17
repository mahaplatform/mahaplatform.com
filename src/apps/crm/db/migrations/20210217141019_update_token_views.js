const UpdateTokenViews = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create or replace view crm_contact_tokens as
      with responses as (
      select crm_contacts.id as contact_id,
      array_remove(array_agg(distinct crm_responses.form_id), null) as form_ids
      from crm_contacts
      left join crm_responses on crm_responses.contact_id = crm_contacts.id
      group by crm_contacts.id
      ),
      registrations as (
      select crm_contacts.id as contact_id,
      array_remove(array_agg(distinct events_registrations.event_id), null) as event_ids
      from crm_contacts
      left join events_registrations on events_registrations.contact_id = crm_contacts.id
      group by crm_contacts.id
      ),
      subscriptions as (
      select crm_contacts.id as contact_id,
      array_remove(array_agg(distinct crm_subscriptions.list_id), null) as list_ids
      from crm_contacts
      left join crm_subscriptions on crm_subscriptions.contact_id = crm_contacts.id
      group by crm_contacts.id
      ),
      interests as (
      select crm_contacts.id as contact_id,
      array_remove(array_agg(distinct crm_interests.topic_id), null) as topic_ids
      from crm_contacts
      left join crm_interests on crm_interests.contact_id = crm_contacts.id
      group by crm_contacts.id
      ),
      imports as (
      select crm_contacts.id as contact_id,
      array_remove(array_agg(distinct maha_imports.id), null) as import_ids
      from crm_contacts
      left join maha_import_items on maha_import_items.object_id = crm_contacts.id
      left join maha_imports on maha_imports.id = maha_import_items.import_id and maha_imports.object_type='crm_contacts'
      group by crm_contacts.id
      )
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
      jsonb_build_object('path', concat('/',maha_teams.subdomain,'/crm/contacts/',crm_contacts.id)) ||
      jsonb_build_object('list_ids', subscriptions.list_ids) ||
      jsonb_build_object('topic_ids', interests.topic_ids) ||
      jsonb_build_object('form_ids', responses.form_ids) ||
      jsonb_build_object('event_ids', registrations.event_ids) ||
      jsonb_build_object('import_ids', imports.import_ids)
      ) as tokens
      from crm_contacts
      inner join maha_teams on maha_teams.id=crm_contacts.team_id
      inner join crm_contact_primaries on crm_contact_primaries.contact_id=crm_contacts.id
      left join responses on responses.contact_id=crm_contacts.id
      left join registrations on registrations.contact_id=crm_contacts.id
      left join subscriptions on subscriptions.contact_id=crm_contacts.id
      left join interests on interests.contact_id=crm_contacts.id
      left join imports on imports.contact_id=crm_contacts.id
      left join crm_email_addresses on crm_email_addresses.id=crm_contact_primaries.email_id
      left join crm_phone_numbers on crm_phone_numbers.id=crm_contact_primaries.phone_id
      left join crm_mailing_addresses on crm_mailing_addresses.id=crm_contact_primaries.address_id
    `)

    await knex.raw(`
      create or replace view crm_response_tokens as
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
      when fields.type = 'paymentfield' then responses.value->'line_items'->0->'total'
      else responses.value
      end as value
      from responses
      inner join fields on responses.form_id=fields.form_id and responses.code=fields.code
      )
      select response_id,
      (
      jsonb_build_object('path', concat('/',maha_teams.subdomain,'/forms/forms/',crm_responses.form_id,'/responses/',computed.response_id)) ||
      jsonb_object_agg(token, value)
      ) as tokens
      from computed
      inner join crm_responses on crm_responses.id=computed.response_id
      inner join maha_teams on maha_teams.id=crm_responses.team_id
      group by response_id,form_id,maha_teams.subdomain
    `)

    await knex.raw(`
      create or replace view events_registration_tokens as
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
      jsonb_build_object('path', concat('/',maha_teams.subdomain,'/events/events/',events_registrations.event_id,'/registrations/',computed.registration_id)) ||
      jsonb_object_agg(token, value)
      ) as tokens
      from computed
      inner join events_registrations on events_registrations.id=computed.registration_id
      inner join maha_teams on maha_teams.id=events_registrations.team_id
      group by registration_id,event_id,maha_teams.subdomain

    `)

    await knex.raw(`
      create or replace view stores_order_tokens as
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
      jsonb_build_object('path', concat('/',maha_teams.subdomain,'/stores/stores/',stores_orders.store_id,'/orders/',computed.order_id)) ||
      jsonb_object_agg(token, value)
      ) as tokens
      from computed
      inner join stores_orders on stores_orders.id=computed.order_id
      inner join maha_teams on maha_teams.id=stores_orders.team_id
      group by order_id,store_id,maha_teams.subdomain
    `)

  },

  down: async (knex) => {
  }

}

export default UpdateTokenViews
