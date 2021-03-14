import { route53Domains } from '@core/vendor/aws'

const expandContact = (contact) => ({
  FirstName: contact.first_name,
  LastName: contact.last_name,
  AddressLine1: contact.street_1,
  AddressLine2: contact.street_2,
  City: contact.city,
  State: contact.state,
  ZipCode: contact.zip
})

const registerDomain = async(req, params) => {

  const { domain, duration, admin, registrant, tech, auto_renew } = params

  const registration = await route53Domains.transferDomain({
    AdminContact: expandContact(admin),
    RegistrantContact: expandContact(registrant),
    TechContact: expandContact(tech),
    DomainName: domain,
    DurationInYears: duration,
    AutoRenew: auto_renew
  }).promise()

  return {
    aws_registration_id: registration.data.OperationId
  }

}

export default registerDomain
