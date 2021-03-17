import { route53Domains } from '@core/vendor/aws'

const disableDomainTransferLock = async({ name, auth_code }) => {
  await route53Domains.disableDomainTransferLock({
    DomainName: name
  }).promise()
}

export default disableDomainTransferLock
