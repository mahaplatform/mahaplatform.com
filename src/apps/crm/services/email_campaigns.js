import Contact from '../models/contact'

export const getRecipients = async (req, { to }) => {

  return await Contact.scope(qb => {
    qb.select(req.trx.raw('distinct on (crm_contacts.id,crm_contacts.first_name,crm_contacts.last_name,crm_contact_primaries.email,crm_contact_primaries.phone) crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_email_addresses', 'crm_email_addresses.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_phone_numbers', 'crm_phone_numbers.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_mailing_addresses', 'crm_mailing_addresses.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_contacts_organizations', 'crm_contacts_organizations.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_taggings', 'crm_taggings.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.team_id', req.team.get('id'))
  }).filter({
    aliases: {
      email: 'crm_contact_primaries.email',
      phone: 'crm_contact_primaries.phone',
      organization_id: 'crm_contacts_organizations.organization_id',
      tag_id: 'crm_taggings.tag_id',
      street_1: 'crm_mailing_addresses.address->>\'street_1\'',
      city: 'crm_mailing_addresses.address->>\'city\'',
      state_province: 'crm_mailing_addresses.address->>\'state_province\'',
      postal_code: 'crm_mailing_addresses.address->>\'postal_code\''
    },
    filter: to,
    filterParams: ['first_name','last_name','email','phone','tag_id','birthday','spouse','street_1','city','state_province','postal_code','organization_id']
  }).fetchAll({
    withRelated: ['email_addresses'],
    transacting: req.trx
  })

}
