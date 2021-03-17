import { route53Domains } from '@core/vendor/aws'

const expandContact = (contact) => ({
  FirstName: contact.first_name,
  LastName: contact.last_name,
  Email: contact.email,
  PhoneNumber: contact.phone.replace('+1', '+1.'),
  AddressLine1: contact.street_1,
  AddressLine2: contact.street_2,
  City: contact.city,
  State: contact.state,
  ZipCode: contact.zip,
  CountryCode: contact.country,
  ContactType: 'PERSON'
})

const transferDomain = async({ name, admin_contact, registrant_contact, tech_contact, auth_code }) => {

  const transfer = await route53Domains.transferDomain({
    DomainName: name,
    AdminContact: expandContact(admin_contact),
    RegistrantContact: expandContact(registrant_contact),
    TechContact: expandContact(tech_contact),
    AuthCode: auth_code,
    DurationInYears: 1,
    AutoRenew: true
  }).promise()

  return {
    aws_operation_id: transfer.OperationId
  }

}

export default transferDomain
