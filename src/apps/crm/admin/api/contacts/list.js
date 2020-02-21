import ContactSerializer from '../../../serializers/contact_serializer'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const listRoute = async (req, res) => {

  const contacts = await Contact.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (crm_contacts.id,crm_contacts.first_name,crm_contacts.last_name,crm_contact_primaries.email,crm_contact_primaries.phone) crm_contacts.*,crm_contact_primaries.*'))
      qb.innerJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
      qb.where('crm_contacts.team_id', req.team.get('id'))
    },
    filter: {
      aliases: {
        email: 'crm_contact_primaries.email',
        phone: 'crm_contact_primaries.phone',
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
        organization_id: {
          column: 'crm_contacts_organizations.organization_id',
          leftJoin: [['contact_id','crm_contacts.id']]
        },
        tag_id: {
          column: 'crm_taggings.tag_id',
          leftJoin: [['contact_id','crm_contacts.id']]
        },
        list_id: {
          column: 'crm_subscriptions.list_id',
          leftJoin: [['contact_id','crm_contacts.id']]
        },
        topic_id: {
          column: 'crm_interests.topic_id',
          leftJoin: [['contact_id','crm_contacts.id']]
        },
        form_id: {
          column: 'crm_responses.form_id',
          leftJoin: [['contact_id','crm_contacts.id']]
        },
        email_campaign_id: {
          column: 'maha_emails.id',
          leftJoin: [['contact_id', 'crm_contacts.id']]
        }
      },
      operations: {
        $de: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_contacts.id and ${alias}.email_campaign_id=${value} and ${alias}.was_delivered = ?`, value, true]
        }),
        $nde: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_contacts.id and ${alias}.email_campaign_id=? and ${alias}.was_delivered = ?`, value, false]
        }),
        $op: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_contacts.id and ${alias}.email_campaign_id=? and ${alias}.was_opened = ?`, value, true]
        }),
        $nop: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_contacts.id and ${alias}.email_campaign_id=? and ${alias}.was_opened = ?`, value, false]
        }),
        $cl: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_contacts.id and ${alias}.email_campaign_id=? and ${alias}.was_clicked = ?`, value, true]
        }),
        $ncl: (table, alias, value) => ({
          join: [`inner join ${table} ${alias} on ${alias}.contact_id=crm_contacts.id and ${alias}.email_campaign_id=? and was_clicked = ?`, value, false]
        })
      },
      params: req.query.$filter,
      allowed: ['first_name','last_name','email','phone','tag_id','birthday','spouse','street_1','city','state_province','postal_code','county','organization_id','tag_id','list_id','topic_id','form_id','import_id','open_id','click_id'],
      search: ['first_name','last_name','email']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'last_name',
      allowed: ['id','first_name','last_name','email','phone']
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  res.status(200).respond(contacts, ContactSerializer)

}

export default listRoute
