import { route53Domains } from '@core/vendor/aws'

const checkTransferability = async({ name, auth_code }) => {

  const transfer = await route53Domains.checkDomainTransferability({
    DomainName: name,
    AuthCode: auth_code
  }).promise()

  return transfer.Transferability.Transferable === 'TRANSFERABLE'

}

export default checkTransferability
