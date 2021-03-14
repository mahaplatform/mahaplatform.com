import DomainSerializer from '@apps/websites/serializers/domain_serializer'
import { createDomain } from '@apps/websites/services/domains'

const createRoute = async (req, res) => {

  const domain = await createDomain(req, {
    name: req.body.name,
    type: req.body.type
  })

  await res.status(200).respond(domain, DomainSerializer)

}

export default createRoute
