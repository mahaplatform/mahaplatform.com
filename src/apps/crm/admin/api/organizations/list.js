import OrganizationSerializer from '../../../serializers/organization_serializer'
import Organization from '../../../models/organization'
import Field from '../../../../maha/models/field'

const listRoute = async (req, res) => {

  const organizations = await Organization.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.leftJoin('crm_taggings', 'crm_taggings.organization_id', 'crm_organizations.id')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['crm_taggings.tag_id'],
    searchParams: ['name']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'name',
    sortParams: ['name']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  req.fields = await Field.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('parent_type', 'crm_organizations')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  res.status(200).respond(organizations, OrganizationSerializer)

}

export default listRoute
