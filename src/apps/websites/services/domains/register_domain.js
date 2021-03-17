import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'
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

const registerDomain = async(req, { domain }) => {

  const registration = await domains.registerDomain({
    name: domain.get('name'),
    admin_contact: expandContact(domain.get('admin_contact')),
    registrant_contact: expandContact(domain.get('registrant_contact')),
    tech_contact: expandContact(domain.get('tech_contact'))
  })

  await domain.save({
    aws_operation_id: registration.aws_operation_id,
    registration_status: 'inprogress'
  }, {
    transacting: req.trx,
    patch: true
  })

  await SetupDomainQueue.enqueue(req, {
    domain_id: domain.get('id'),
    action: 'check_registrant'
  }, {
    delay: 5 * 60 * 1000
  })

}

export default registerDomain
