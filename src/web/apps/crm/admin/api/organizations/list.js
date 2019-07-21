import OrganizationSerializer from '../../../serializers/organization_serializer'
import Organization from '../../../models/organization'

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

  res.status(200).respond(organizations, OrganizationSerializer)

}

export default listRoute
