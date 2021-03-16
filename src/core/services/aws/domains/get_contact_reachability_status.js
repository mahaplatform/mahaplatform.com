import { route53Domains } from '@core/vendor/aws'

const getContactReachabilityStatus = async(req, { name }) => {

  const reachability = await route53Domains.getContactReachabilityStatus({
    domainName: name
  }).promise()

  return {
    status: reachability.status.toLowerCase()
  }

}

export default getContactReachabilityStatus
