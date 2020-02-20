import CommitmentSerializer from '../../../../serializers/commitment_serializer'
import Commitment from '../../../../models/commitment'

const listRoute = async (req, res) => {

  const commitments = await Commitment.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('plan_id', req.params.plan_id)
    }
  }).fetchPage({
    withRelated: ['resource'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(commitments, CommitmentSerializer)

}

export default listRoute
