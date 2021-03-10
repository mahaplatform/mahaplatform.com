import AgreementSerializer from '@apps/maha/serializers/agreement_serializer'
import Agreement from '@apps/maha/models/agreement'

const showRoute = async (req, res) => {

  const agreement = await Agreement.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['signed'],
    transacting: req.trx
  })

  if(!agreement) return res.status(404).json({
    code: 404,
    message: 'Unable to find agreement'
  })

  await res.status(200).respond(agreement, AgreementSerializer)
}

export default showRoute
