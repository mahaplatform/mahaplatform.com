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

const transferDomain = async(req, params) => {

  const { domain, duration, admin, registrant, tech, authcode, autorenew } = params

  await route53Domains.transferDomain({
    AdminContact: expandContact(admin),
    RegistrantContact: expandContact(registrant),
    TechContact: expandContact(tech),
    DomainName: domain,
    DurationInYears: duration,
    AuthCode: authcode,
    AutoRenew: autorenew
  }).promise()

}

export default transferDomain
