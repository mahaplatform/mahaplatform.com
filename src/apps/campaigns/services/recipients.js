import { toFilter } from '@core/utils/criteria'
import Filter from '../../maha/models/filter'
import Recipient from '../models/recipient'
import Field from '../../maha/models/field'

const getCreator = (strategy) => {
  if(strategy === 'contacts') return getRecipientsById
  if(strategy === 'list')  return getRecipientsByList
  if(strategy === 'topic')  return getRecipientsByTopic
  if(strategy === 'filter')  return getRecipientsByFilter
  if(strategy === 'lookup')  return getRecipientsByLookup
  if(strategy === 'criteria')  return getRecipientsByCriteria
}

const getFilter = ({ filter, criteria }) => {
  if(filter) return filter
  if(criteria) return toFilter(criteria, null)
  return null
}

const getRecipientsById = async (req, { contact_ids }) => ({
  scope: (qb) => {
    qb.whereIn('crm_recipients.contact_id', contact_ids)
  }
})

const getRecipientsByList = async (req, { list_id }) => ({
  scope: (qb) => {
    qb.innerJoin('crm_subscriptions', 'crm_subscriptions.contact_id', 'crm_contacts.id')
    qb.where('crm_subscriptions.list_id', list_id)
  }
})

const getRecipientsByTopic = async (req, { topic_id }) => ({
  scope: (qb) => {
    qb.innerJoin('crm_interests', 'crm_interests.contact_id', 'crm_contacts.id')
    qb.where('crm_interests.topic_id', topic_id)
  }
})

const getRecipientsByFilter = async (req, { filter_id }) => {

  const filter = await Filter.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', 'admin-crm-contacts')
    qb.where('id', filter_id)
  }).fetch({
    transacting: req.trx
  })

  return await getRecipientsByCriteria(req, {
    criteria: filter.get('config').criteria
  })

}

const getRecipientsByLookup = async (req, { filter }) => ({
  filter
})

const getRecipientsByCriteria = async (req, params) => {
  const filter = getFilter(params)
  return {
    filter,
    scope: (qb) => {
      if(!filter || filter.$and.length === 0) qb.whereRaw('false')
    },
    aliases: {
      contact_id: 'crm_recipients.contact_id',
      address: {
        column: 'crm_mailing_addresses.address',
        leftJoin: [['contact_id', 'crm_recipients.contact_id']]
      },
      street_1: {
        column: 'crm_mailing_addresses.address->\'street_1\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      city: {
        column: 'crm_mailing_addresses.address->\'city\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      state_province: {
        column: 'crm_mailing_addresses.address->\'state_province\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      postal_code: {
        column: 'crm_mailing_addresses.address->\'postal_code\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      county: {
        column: 'crm_mailing_addresses.address->\'county\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      email_campaign_id: {
        column: 'maha_emails.email_campaign_id',
        leftJoin: [['contact_id', 'crm_recipients.contact_id']]
      },
      email_id: {
        column: 'maha_emails.email_id',
        leftJoin: [['contact_id', 'crm_recipients.contact_id']]
      },
      enrollment_id: {
        column: 'crm_workflow_enrollments.workflow_id',
        leftJoin: [['contact_id', 'crm_recipients.contact_id']]
      },
      event_id: {
        column: 'events_registrations.event_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      form_id: {
        column: 'crm_responses.form_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      import_id: {
        column: 'maha_imports_import_items.import_id',
        leftJoin: [
          ['object_type','\'crm_contacts\''],
          ['object_id','crm_recipients.contact_id']
        ]
      },
      list_id: {
        column: 'crm_subscriptions.list_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      product_id: {
        column: 'finance_customer_products.product_id',
        leftJoin: [['customer_id', 'crm_recipients.contact_id']]
      },
      sms_enrollment_id: {
        column: 'crm_workflow_enrollments.sms_campaign_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      tag_id: {
        column: 'crm_taggings.tag_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      topic_id: {
        column: 'crm_interests.topic_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      voice_enrollment_id: {
        column: 'crm_workflow_enrollments.voice_campaign_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      }
    },
    allowed: ['tag_id','birthday','spouse','street_1','city','state_province','postal_code','county','list_id','topic_id','email_id','email_campaign_id','form_id','import_id'],
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
      $naddt: (table, alias, column, value, foreign_key, primary_key) => ({
        join: [
          `left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.address->>'latitude' is not null and st_dwithin(concat('POINT(',${alias}.address->>'longitude',' ',${alias}.address->>'latitude',')')::geography, ?::geography, ?)`,
          `point(${value.origin.split(',').reverse().join(' ')})`, value.distance * 1609.34
        ],
        query: `${alias}.${foreign_key} is null`
      }),
      $adsh: (table, alias, column, value, foreign_key, primary_key) => ({
        join: [
          `left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.address->>'latitude' is not null and st_contains(?::geometry,concat('point(',${alias}.address->>'longitude',' ',${alias}.address->>'latitude',')')::geometry)`,
          `polygon((${value.map(pair => pair.split(',').reverse().join(' ')).join(', ')}))`
        ],
        query: `${alias}.${foreign_key} is not null`
      }),
      $nadsh: (table, alias, column, value, foreign_key, primary_key) => ({
        join: [
          `left join ${table} ${alias} on ${alias}.${foreign_key}=${primary_key} and ${alias}.address->>'latitude' is not null and st_contains(?::geometry,concat('point(',${alias}.address->>'longitude',' ',${alias}.address->>'latitude',')')::geometry)`,
          `polygon((${value.map(pair => pair.split(',').reverse().join(' ')).join(', ')}))`
        ],
        query: `${alias}.${foreign_key} is null`
      })
    }
  }

}

export const getRecipients = async (req, params) => {

  const { config, page, program_id, purpose, strategy, type } = params

  if(!config) return []

  const creator = getCreator(strategy)

  const args = await creator(req, config)

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  return await Recipient.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (crm_recipients.contact_id,crm_recipients.email_address_id,crm_recipients.phone_number_id,crm_recipients.mailing_address_id,crm_contacts.last_name) crm_recipients.*'))
      qb.innerJoin('crm_contacts','crm_contacts.id','crm_recipients.contact_id')
      qb.where('crm_recipients.team_id', req.team.get('id'))
      qb.where('type', type)
      qb.where('purpose', purpose)
      qb.orderBy('crm_contacts.last_name','asc')
      if(purpose === 'marketing') qb.where('program_id', program_id)
      if(args.scope) args.scope(qb)
    },
    aliases: {
      ...req.fields ? req.fields.reduce((aliases, field) => ({
        ...aliases,
        [field.get('code')]: {
          column: `crm_contacts.values->'${field.get('code')}'`
        }
      }), {}) : {},
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name',
      email: {
        column: 'crm_email_addresses.address',
        leftJoin: [['id','crm_recipients.email_address_id']]
      },
      phone: {
        column: 'crm_phone_numbers.number',
        leftJoin: [['id','crm_recipients.phone_number_id']]
      },
      ...args.aliases || {}
    },
    filter: {
      params: args.filter || {},
      operations: args.operations || {},
      allowed: [
        'first_name','last_name','email','phone',
        ...args.allowed || []
      ],
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query ? req.query.$sort : null,
      defaults: 'last_name',
      allowed: ['id','first_name','last_name','email','phone']
    },
    page,
    withRelated: ['contact.photo','email_address','mailing_address','phone_number'],
    transacting: req.trx
  })
}
