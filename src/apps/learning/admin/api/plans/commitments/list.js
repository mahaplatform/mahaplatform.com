import CommitmentSerializer from '../../../../serializers/commitment_serializer'
import Commitment from '../../../../models/commitment'

const listRoute = async (req, res) => {

  const commitments = await Commitment.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('plan_id', req.params.plan_id)
    },
    page: req.query.$page,
    withRelated: ['resource'],
    transacting: req.trx
  })

  res.status(200).respond(commitments, CommitmentSerializer)

}

export default listRoute
