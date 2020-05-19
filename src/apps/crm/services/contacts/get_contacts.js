import Contact from '../../models/contact'

const getContacts = async (req, { empty, filter, page, scope, sort, withRelated }) => {

  return await Contact.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (crm_contacts.id,crm_contacts.first_name,crm_contacts.last_name,crm_contact_primaries.email,crm_contact_primaries.phone) crm_contacts.*,crm_contact_primaries.*'))
      qb.innerJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
      qb.where('crm_contacts.team_id', req.team.get('id'))
      if(scope) scope(qb)
      if(empty === true && (!filter || filter.$and.length === 0)) qb.whereRaw('false')
    },
    aliases: {
      email: 'crm_contact_primaries.email',
      phone: 'crm_contact_primaries.phone',
      address: {
        column: 'crm_mailing_addresses.address',
        leftJoin: [['contact_id', 'crm_contacts.id']]
      },
      street_1: {
        column: 'crm_mailing_addresses.address->>\'street_1\'',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      city: {
        column: 'crm_mailing_addresses.address->>\'city\'',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      state_province: {
        column: 'crm_mailing_addresses.address->>\'state_province\'',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      postal_code: {
        column: 'crm_mailing_addresses.address->>\'postal_code\'',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      county: {
        column: 'crm_mailing_addresses.address->>\'county\'',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      email_campaign_id: {
        column: 'maha_emails.email_campaign_id',
        leftJoin: [['contact_id', 'crm_contacts.id']]
      },
      email_id: {
        column: 'maha_emails.email_id',
        leftJoin: [['contact_id', 'crm_contacts.id']]
      },
      enrollment_id: {
        column: 'crm_workflow_enrollments.workflow_id',
        leftJoin: [['contact_id', 'crm_contacts.id']]
      },
      event_id: {
        column: 'events_registrations.event_id',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      form_id: {
        column: 'crm_responses.form_id',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      import_id: {
        column: 'maha_imports_import_items.import_id',
        leftJoin: [
          ['object_type','\'crm_contacts\''],
          ['object_id','crm_contacts.id']
        ]
      },
      list_id: {
        column: 'crm_subscriptions.list_id',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      organization_id: {
        column: 'crm_contacts_organizations.organization_id',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      product_id: {
        column: 'finance_customer_products.product_id',
        leftJoin: [['customer_id', 'crm_contacts.id']]
      },
      sms_enrollment_id: {
        column: 'crm_workflow_enrollments.sms_campaign_id',
        leftJoin: [['contact_id', 'crm_contacts.id']]
      },
      tag_id: {
        column: 'crm_taggings.tag_id',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      topic_id: {
        column: 'crm_interests.topic_id',
        leftJoin: [['contact_id','crm_contacts.id']]
      },
      voice_enrollment_id: {
        column: 'crm_workflow_enrollments.voice_campaign_id',
        leftJoin: [['contact_id', 'crm_contacts.id']]
      }
    },
    filter: {
      operations: {
        $se: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.${column}=?`, value],
          query: `${alias}.${foreign_key} is not null`
        }),
        $nse: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.${column}=?`, value],
          query: `${alias}.${foreign_key} is null`
        }),
        $de: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.${column}=? and ${alias}.was_delivered = ?`, value, true],
          query: `${alias}.${foreign_key} is not null`
        }),
        $nde: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.${column}=? and ${alias}.was_delivered = ?`, value, false],
          query: `${alias}.${foreign_key} is not null`
        }),
        $op: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.${column}=? and ${alias}.was_opened = ?`, value, true],
          query: `${alias}.${foreign_key} is not null`
        }),
        $nop: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.${column}=? and ${alias}.was_opened = ?`, value, false],
          query: `${alias}.${foreign_key} is not null`
        }),
        $cl: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.${column}=? and ${alias}.was_clicked = ?`, value, true],
          query: `${alias}.${foreign_key} is not null`
        }),
        $ncl: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.${column}=? and ${alias}.was_clicked = ?`, value, false],
          query: `${alias}.${foreign_key} is not null`
        }),
        $wcm: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.workflow_id=? and ${alias}.status=?`, value, 'completed'],
          query: `${alias}.${foreign_key} is not null`
        }),
        $nwcm: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.workflow_id=? and ${alias}.status !=?`, value, 'completed'],
          query: `${alias}.${foreign_key} is not null`
        }),
        $wcv: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.workflow_id=? and ${alias}.was_converted=?`, value, true],
          query: `${alias}.${foreign_key} is not null`
        }),
        $nwcv: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [`left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.workflow_id=? and ${alias}.was_converted=?`, value, false],
          query: `${alias}.${foreign_key} is not null`
        }),
        $addt: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [
            `left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.address->>'latitude' is not null and st_dwithin(concat('POINT(',${alias}.address->>'longitude',' ',${alias}.address->>'latitude',')')::geography, ?::geography, ?)`,
            `point(${value.origin.split(',').reverse().join(' ')})`, value.distance * 1609.34
          ],
          query: `${alias}.${foreign_key} is not null`
        }),
        $adsh: (table, alias, column, value, foreign_key, primary_key) => ({
          join: [
            `left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.address->>'latitude' is not null and st_contains(?::geometry,concat('point(',${alias}.address->>'longitude',' ',${alias}.address->>'latitude',')')::geometry)`,
            `polygon((${value.map(pair => pair.split(',').reverse().join(' ')).join(', ')}))`
          ],
          query: `${alias}.${foreign_key} is not null`
        })
      },
      params: filter,
      allowed: ['first_name','last_name','email','phone','tag_id','birthday','spouse','street_1','city','state_province','postal_code','county','organization_id','tag_id','list_id','topic_id','form_id','import_id','open_id','click_id'],
      search: ['first_name','last_name','email']
    },
    sort: {
      params: sort,
      defaults: 'last_name',
      allowed: ['id','first_name','last_name','email','phone']
    },
    page: page,
    withRelated: [
      'photo',
      ...withRelated || []
    ],
    transacting: req.trx
  })
}

export default getContacts
