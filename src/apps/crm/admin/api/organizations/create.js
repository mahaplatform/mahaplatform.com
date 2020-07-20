import { updateRelated } from '../../../../../core/services/routes/relations'
import OrganizationSerializer from '../../../serializers/organization_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import Organization from '../../../models/organization'
import Field from '../../../../maha/models/field'

const createRoute = async (req, res) => {

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const values = await processValues(req, {
    parent_type: 'crm_contacts',
    values: req.body.values
  })

  const organization = await Organization.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['name','logo_id']),
    values
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
