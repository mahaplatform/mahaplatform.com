import * as domains from '@core/services/aws/domains'

const expandContact = (contact) => ({
  first_name: contact.first_name,
  last_name: contact.last_name,
  email: contact.email,
  phone: contact.phone.replace('+1', '+1.'),
  street_1: contact.address.street_1,
  street_2: contact.address.street_2,
  city: contact.address.city,
  state: contact.address.state_province,
  zip: contact.address.postal_code,
  country: contact.address.country
})

const registerDomain = async(req, { name, admin_contact, registrant_contact, tech_contact }) => {

  await domains.registerDomain(req, {
    name,
    admin_contact: expandContact(admin_contact),
    registrant_contact: expandContact(registrant_contact),
    tech_contact: expandContact(tech_contact)
  })

}

export default registerDomain
