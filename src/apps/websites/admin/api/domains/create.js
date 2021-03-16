import DomainSerializer from '@apps/websites/serializers/domain_serializer'
import { createDomain } from '@apps/websites/services/domains'
import { activity } from '@core/services/routes/activities'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'

const createRoute = async (req, res) => {

  const domain = await createDomain(req, {
    name: req.body.name,
    type: req.body.type,
    auth_code: req.body.auth_code,
    registrant_contact: req.body.registrant_contact,
    admin_contact: req.body.admin_contact,
    tech_contact: req.body.tech_contact
  })

  await audit(req, {
    story: 'created',
    auditable: domain
  })

  await activity(req, {
    story: 'created {object}',
    object: domain
  })

  await socket.refresh(req, [
    '/admin/websites/domains'
  ])

  await res.status(200).respond(domain, DomainSerializer)

}

export default createRoute
