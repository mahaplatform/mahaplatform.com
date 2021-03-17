import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'
import * as domains from '@core/services/aws/domains'

const contact = {
  first_name: 'Maha',
  last_name: 'Platform',
  email: 'domains@mahaplatform.com',
  phone: '+1.6072722292',
  street_1: '615 Willow Ave',
  street_2: null,
  city: 'Ithaca',
  state: 'NY',
  zip: '14850',
  country: 'US'
}

const registerDomain = async(req, { domain }) => {

  const registration = await domains.registerDomain({
    name: domain.get('name'),
    admin_contact: contact,
    registrant_contact: contact,
    tech_contact: contact
  })

  await domain.save({
    aws_operation_id: registration.aws_operation_id,
    registration_status: 'inprogress',
    is_locked: true
  }, {
    transacting: req.trx,
    patch: true
  })

  await SetupDomainQueue.enqueue(req, {
    domain_id: domain.get('id'),
    action: 'check_operation'
  }, {
    delay: 5 * 60 * 1000
  })

}

export default registerDomain
