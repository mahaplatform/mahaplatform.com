import OrganizationSerializer from '../../../serializers/organization_serializer'
import Organization from '../../../models/organization'
import Field from '../../../../maha/models/field'

const listRoute = async (req, res) => {

  const organizations = await Organization.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.leftJoin('crm_taggings', 'crm_taggings.organization_id', 'crm_organizations.id')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['crm_taggings.tag_id'],
      search: ['name']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'name',
      allowed: ['id','name']
    },
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_organizations')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  res.status(200).respond(organizations, OrganizationSerializer)

}

export default listRoute
