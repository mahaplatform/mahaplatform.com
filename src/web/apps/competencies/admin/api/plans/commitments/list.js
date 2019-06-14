import CommitmentSerializer from '../../../../serializers/commitment_serializer'
import Commitment from '../../../../models/commitment'

const listRoute = async (req, res) => {

  const commitments = await Commitment.scope({
    team: req.team
  }).query(qb => {
    qb.where('plan_id', req.params.plan_id)
  }).filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(commitments, (commitment) => {
    return CommitmentSerializer(req, req.trx, commitment)
  })

}

export default listRoute
