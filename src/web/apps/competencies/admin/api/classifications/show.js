import ClassificationSerializer from '../../../serializers/classification_serializer'
import Classification from '../../../models/classification'

const showRoute = async (req, res) => {

  const classification = await Classification.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!classification) return req.status(404).respond({
    code: 404,
    message: 'Unable to load classification'
  })

  res.status(200).respond(classification, (classification) => {
    return ClassificationSerializer(req, classification)
  })

}

export default showRoute
