import { activity } from '../../../../../core/services/routes/activities'
import OrganizationSerializer from '../../../serializers/organization_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Organization from '../../../models/organization'

const createRoute = async (req, res) => {

  const organization = await Organization.forge({
    team_id: req.team.get('id'),
    values: {},
    ...whitelist(req.body, ['name','logo_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: organization
  })

  await socket.refresh(req, [
    '/admin/crm/organizations'
  ])

  await organization.load(['logo'], {
    transacting: req.trx
  })

  res.status(200).respond(organization, OrganizationSerializer)

}

export default createRoute
