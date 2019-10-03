import { updateRelated } from '../../../../../core/services/routes/relations'
import OrganizationSerializer from '../../../serializers/organization_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import Organization from '../../../models/organization'
import Field from '../../../../maha/models/field'

const createRoute = async (req, res) => {

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
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

  await updateRelated(req, {
    object: organization,
    related: 'tags',
    table: 'crm_taggings',
    ids: req.body.tag_ids,
    foreign_key: 'organization_id',
    related_foreign_key: 'tag_id'
  })

  await activity(req, {
    story: 'created {object}',
    object: organization
  })

  await socket.refresh(req, [
    '/admin/crm/organizations'
  ])

  await organization.load(['logo','tags'], {
    transacting: req.trx
  })

  res.status(200).respond(organization, OrganizationSerializer)

}

export default createRoute
