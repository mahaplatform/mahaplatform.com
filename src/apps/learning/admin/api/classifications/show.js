import ClassificationSerializer from '@apps/learning/serializers/classification_serializer'
import Classification from '@apps/learning/models/classification'

const showRoute = async (req, res) => {

  const classification = await Classification.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!classification) return res.status(404).respond({
    code: 404,
    message: 'Unable to load classification'
  })

  res.status(200).respond(classification, ClassificationSerializer)

}

export default showRoute
