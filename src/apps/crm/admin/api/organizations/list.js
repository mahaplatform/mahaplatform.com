import OrganizationSerializer from '../../../serializers/organization_serializer'
import Organization from '../../../models/organization'
import Field from '../../../../maha/models/field'

const listRoute = async (req, res) => {

  const organizations = await Organization.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.leftJoin('crm_taggings', 'crm_taggings.organization_id', 'crm_organizations.id')
    },
    filter: req.query.$filter,
    filterParams: ['crm_taggings.tag_id'],
    searchParams: ['name'],
    sort: req.query.$sort,
    defaultSort: 'name',
    sortParams: ['name']
  }).fetchPage({
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
