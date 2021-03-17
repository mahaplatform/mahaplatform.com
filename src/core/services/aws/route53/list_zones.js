import { route53 } from '@core/vendor/aws'

const listZones = async (req) => {

  const result = await route53.listHostedZones().promise()

  return result.HostedZones.map(zone => ({
    id: zone.Id,
    name: zone.Name
  }))

}

export default listZones
