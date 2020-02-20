import OrganizationSerializer from '../../../serializers/organization_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import Organization from '../../../models/organization'
import Field from '../../../../maha/models/field'

const updateRoute = async (req, res) => {

  const organization = await Organization.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!organization) return res.status(404).respond({
    code: 404,
    message: 'Unable to load organization'
  })

  const values = await processValues(req, {
    parent_type: 'crm_organizations',
    values: req.body.values
  })

  await organization.save({
    ...whitelist(req.body, ['name','logo_id']),
    values
  }, {
    transacting: req.trx
  })

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

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
