import { route53Domains } from '@core/vendor/aws'

const updateDomainContactPrivacy = async({ name, auth_code }) => {
  await route53Domains.updateDomainContactPrivacy({
    DomainName: name,
    AdminPrivacy: true,
    RegistrantPrivacy: true,
    TechPrivacy: true
  }).promise()

}

export default updateDomainContactPrivacy
