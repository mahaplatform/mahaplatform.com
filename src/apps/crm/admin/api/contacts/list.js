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
        street_1: 'crm_mailing_addresses.address->>\'street_1\'',
        city: 'crm_mailing_addresses.address->>\'city\'',
        state_province: 'crm_mailing_addresses.address->>\'state_province\'',
        postal_code: 'crm_mailing_addresses.address->>\'postal_code\'',
        county: 'crm_mailing_addresses.address->>\'county\'',
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
          joins: [`left join ${table} ${alias} ${alias}.contact_id=crm_contacts.id and ${alias}.campaign_id=${value} and ${alias}.was_delivered = ?`],
          query: 'where was delivered is null',
          bindings: [value, true]
        }),
        $nde: (table, alias, value) => ({
          joins: [`left join ${table} ${alias} ${alias}.contact_id=crm_contacts.id and ${alias}.campaign_id=? and ${alias}.was_delivered = ?`],
          query: 'where was delivered is null',
          bindings: [value, true]
        }),
        $op: (table, alias, value) => ({
          joins: [`left join ${table} ${alias} ${alias}.contact_id=crm_contacts.id and ${alias}.campaign_id=? and ${alias}.was_opened = ?`],
          query: 'where was delivered is null',
          bindings: [value, true]
        }),
        $nop: (table, alias, value) => ({
          joins: [`left join ${table} ${alias} ${alias}.contact_id=crm_contacts.id and ${alias}.campaign_id=? and ${alias}.was_opened = ?`],
          query: 'where was delivered is null',
          bindings: [value, true]
        }),
        $cl: (table, alias, value) => ({
          joins: [`left join ${table} ${alias} ${alias}.contact_id=crm_contacts.id and ${alias}.campaign_id=? and ${alias}.was_clicked = ?`],
          query: 'where was delivered is null',
          bindings: [value, true]
        }),
        $ncl: (table, alias, value) => ({
          joins: [`left join ${table} ${alias} ${alias}.contact_id=crm_contacts.id and ${alias}.campaign_id=? and was_clicked = ?`],
          query: 'where was delivered is null',
          bindings: [value, true]
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
