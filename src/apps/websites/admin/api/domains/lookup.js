import { lookupDomain } from '@core/services/aws/domains'

const lookupRoute = async (req, res) => {

  const domains = await lookupDomain(req, {
    name: req.query.name
  })

  await res.status(200).respond(domains)

}

export default lookupRoute
