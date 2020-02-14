import Field from '../../maha/models/field'
import Contact from '../models/contact'

export const getRecipients = async (req, { filter, page }) => {

  req.fields = await Field.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const Recipient = Contact.scope(qb => {
    qb.select(req.trx.raw('distinct on (crm_contacts.id,crm_contacts.first_name,crm_contacts.last_name,crm_contact_primaries.email,crm_contact_primaries.phone) crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_email_addresses', 'crm_email_addresses.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_phone_numbers', 'crm_phone_numbers.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_mailing_addresses', 'crm_mailing_addresses.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_contacts_organizations', 'crm_contacts_organizations.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_taggings', 'crm_taggings.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_subscriptions', 'crm_subscriptions.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_interests', 'crm_interests.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.team_id', req.team.get('id'))
    if(!filter || filter.$and.length === 0) qb.whereRaw('false')
  }).filter({
    aliases: {
      email: 'crm_contact_primaries.email',
      phone: 'crm_contact_primaries.phone',
      organization_id: 'crm_contacts_organizations.organization_id',
      street_1: 'crm_mailing_addresses.address->>\'street_1\'',
      city: 'crm_mailing_addresses.address->>\'city\'',
      state_province: 'crm_mailing_addresses.address->>\'state_province\'',
      postal_code: 'crm_mailing_addresses.address->>\'postal_code\'',
      tag_id: 'crm_taggings.tag_id',
      list_id: 'crm_subscriptions.list_id',
      topic_id: 'crm_interests.topic_id'
    },
    filter,
    filterParams: ['first_name','last_name','email','phone','tag_id','birthday','spouse','street_1','city','state_province','postal_code','organization_id','tag_id','list_id','topic_id']
  })

  if(page) {
    return await Recipient.fetchPage({
      page,
      withRelated: ['photo'],
      transacting: req.trx
    })
  }

  return await Recipient.fetchAll({
    withRelated: ['photo'],
    transacting: req.trx
  })

}
