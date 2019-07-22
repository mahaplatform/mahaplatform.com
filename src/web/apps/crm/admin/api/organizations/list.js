import OrganizationSerializer from '../../../serializers/organization_serializer'
import Organization from '../../../models/organization'
import Field from '../../../../maha/models/field'

const listRoute = async (req, res) => {

  const organizations = await Organization.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
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

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'crm_organizations')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  res.status(200).respond(organizations, OrganizationSerializer)

}

export default listRoute
