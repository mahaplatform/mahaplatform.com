import ClassificationSerializer from '../../../serializers/classification_serializer'
import Classification from '../../../models/classification'

const showRoute = async (req, res) => {

  const classification = await Classification.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
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
