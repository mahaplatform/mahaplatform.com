import OrganizationSerializer from '../../../serializers/organization_serializer'
import Organization from '../../../models/organization'

const showRoute = async (req, res) => {

  const organization = await Organization.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['logo'],
    transacting: req.trx
  })

  if(!organization) return res.status(404).respond({
    code: 404,
    message: 'Unable to load organization'
  })

  res.status(200).respond(organization, OrganizationSerializer)

}

export default showRoute
