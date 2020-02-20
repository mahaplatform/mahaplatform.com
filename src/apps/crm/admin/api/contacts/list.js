import { getFilterFields } from '../../../../../core/services/routes/filters'
import ContactSerializer from '../../../serializers/contact_serializer'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const listRoute = async (req, res) => {

  const fields = getFilterFields(req.query.$filter)
  const { street_1, city, state_province, postal_code, county } = fields
  const { organization_id, tag_id, list_id, topic_id, form_id } = fields
  const { import_id, open_id, click_id } = fields
  const address = street_1 || city || state_province || postal_code || county

  const contacts = await Contact.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (crm_contacts.id,crm_contacts.first_name,crm_contacts.last_name,crm_contact_primaries.email,crm_contact_primaries.phone) crm_contacts.*,crm_contact_primaries.*'))
      qb.innerJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
      if(address) qb.leftJoin('crm_mailing_addresses', 'crm_mailing_addresses.contact_id', 'crm_contacts.id')
      if(organization_id) qb.leftJoin('crm_contacts_organizations', 'crm_contacts_organizations.contact_id', 'crm_contacts.id')
      if(tag_id) qb.leftJoin('crm_taggings', 'crm_taggings.contact_id', 'crm_contacts.id')
      if(list_id) qb.leftJoin('crm_subscriptions', 'crm_subscriptions.contact_id', 'crm_contacts.id')
      if(topic_id) qb.leftJoin('crm_interests', 'crm_interests.contact_id', 'crm_contacts.id')
      if(form_id) qb.leftJoin('crm_responses', 'crm_responses.contact_id', 'crm_contacts.id')
      if(import_id) qb.joinRaw('left join maha_imports_import_items on object_type=\'crm_contacts\' and object_id=crm_contacts.id')
      // if(open_id) qb.joinRaw('inner join maha_emails maha_email_opens on maha_email_opens.contact_id=crm_contacts.id and maha_email_opens.email_campaign_id=?')
      // if(click_id) qb.joinRaw('inner join maha_emails maha_email_clicks on maha_email_clicks.contact_id=crm_contacts.id and maha_email_clicks.email_campaign_id=?')
      qb.where('crm_contacts.team_id', req.team.get('id'))
    },
    aliases: {
      email: 'crm_contact_primaries.email',
      phone: 'crm_contact_primaries.phone',
      organization_id: 'crm_contacts_organizations.organization_id',
      street_1: 'crm_mailing_addresses.address->>\'street_1\'',
      city: 'crm_mailing_addresses.address->>\'city\'',
      state_province: 'crm_mailing_addresses.address->>\'state_province\'',
      postal_code: 'crm_mailing_addresses.address->>\'postal_code\'',
      county: 'crm_mailing_addresses.address->>\'county\'',
      tag_id: 'crm_taggings.tag_id',
      list_id: 'crm_subscriptions.list_id',
      topic_id: 'crm_interests.topic_id',
      form_id: 'crm_responses.form_id',
      import_id: 'maha_imports_import_items.import_id',
      // open_id: 'maha_email_opens.email_campaign_id',
      // click_id: 'maha_email_clicks.email_campaign_id'
    },
    filter: {
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
