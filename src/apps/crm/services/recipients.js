import { toFilter } from '../../../core/utils/criteria'
import Recipient from '../models/recipient'
import Field from '../../maha/models/field'

const getFilter = ({ filter, criteria }) => {
  if(filter) return filter
  if(criteria) return toFilter(criteria, null)
  return null
}

export const getRecipients = async (req, params) => {

  const { type, purpose, program_id, page } = params

  const filter = getFilter(params)

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
      qb.where('crm_contacts.team_id', req.team.get('id'))
      if(!filter || filter.$and.length === 0) qb.whereRaw('false')
      qb.where('type', type)
      qb.where('purpose', purpose)
      if(purpose === 'marketing') qb.where('program_id', program_id)
      qb.where('crm_recipients.team_id', req.team.get('id'))
      qb.orderBy('crm_contacts.last_name','asc')
    },
    aliases: {
      email: 'crm_contact_primaries.email',
      phone: 'crm_contact_primaries.phone',
      street_1: {
        column: 'crm_mailing_addresses.address->>\'street_1\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      city: {
        column: 'crm_mailing_addresses.address->>\'city\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      state_province: {
        column: 'crm_mailing_addresses.address->>\'state_province\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      postal_code: {
        column: 'crm_mailing_addresses.address->>\'postal_code\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      county: {
        column: 'crm_mailing_addresses.address->>\'county\'',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      organization_id: {
        column: 'crm_contacts_organizations.organization_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      tag_id: {
        column: 'crm_taggings.tag_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      list_id: {
        column: 'crm_subscriptions.list_id',
        leftJoin: [['contact_id','crm_recipients.contact_id']]
      },
      topic_id: {
        column: 'crm_interests.topic_id',
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
      email_campaign_id: {
        column: 'maha_emails.id',
        leftJoin: [['contact_id', 'crm_recipients.contact_id']]
      }
    },
    filter: {
      operations: {
        $de: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_recipients.contact_id and ${alias}.email_campaign_id=${value} and ${alias}.was_delivered = ?`, value, true]
        }),
        $nde: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_recipients.contact_id and ${alias}.email_campaign_id=? and ${alias}.was_delivered = ?`, value, false]
        }),
        $op: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_recipients.contact_id and ${alias}.email_campaign_id=? and ${alias}.was_opened = ?`, value, true]
        }),
        $nop: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_recipients.contact_id and ${alias}.email_campaign_id=? and ${alias}.was_opened = ?`, value, false]
        }),
        $cl: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_recipients.contact_id and ${alias}.email_campaign_id=? and ${alias}.was_clicked = ?`, value, true]
        }),
        $ncl: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_recipients.contact_id and ${alias}.email_campaign_id=? and was_clicked = ?`, value, false]
        })
      },
      params: filter,
      allowed: ['first_name','last_name','email','phone','tag_id','birthday','spouse','street_1','city','state_province','postal_code','county','organization_id','tag_id','list_id','topic_id','form_id','import_id','open_id','click_id'],
      search: ['first_name','last_name','email']
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
