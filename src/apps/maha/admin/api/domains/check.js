import { route53Domains } from '@core/vendor/aws'

const checkRoute = async (req, res) => {

  const availability = await route53Domains.checkDomainAvailability({
    DomainName: req.query.name
  }).promise().then(result => ({
    availability: result.Availability
  }))

  await res.status(200).respond(availability)

}

export default checkRoute
