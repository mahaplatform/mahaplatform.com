import OrganizationSerializer from '../../../serializers/organization_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Organization from '../../../models/organization'

const updateRoute = async (req, res) => {

  const organization = await Organization.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!organization) return res.status(404).respond({
    code: 404,
    message: 'Unable to load organization'
  })

  await organization.save(whitelist(req.body, ['name','logo_id']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: organization
  })

  await socket.refresh(req, [
    '/admin/crm/organizations',
    `/admin/crm/organizations/${organization.get('id')}`
  ])

  await organization.load(['logo'], {
    transacting: req.trx
  })

  res.status(200).respond(organization, OrganizationSerializer)

}

export default updateRoute
