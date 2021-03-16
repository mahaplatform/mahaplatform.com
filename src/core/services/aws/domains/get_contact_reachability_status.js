import { route53Domains } from '@core/vendor/aws'

const getContactReachabilityStatus = async(req, { name }) => {

  const reachability = await route53Domains.getContactReachabilityStatus({
    DomainName: name
  }).promise()

  console.log({ reachability })

  return {
    status: reachability.status.toLowerCase()
  }

}

export default getContactReachabilityStatus
