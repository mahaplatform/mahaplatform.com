import { route53Domains } from '@core/vendor/aws'

const enableDomainTransferLock = async({ name, auth_code }) => {
  await route53Domains.enableDomainTransferLock({
    DomainName: name
  }).promise()
}

export default enableDomainTransferLock
