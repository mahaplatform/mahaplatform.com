import AppraisalsSerializer from '@apps/appraisals/serializers/appraisal_serializer'
import Appraisal from '@apps/appraisals/models/appraisal'

const showRoute = async (req, res) => {

  const appraisal = await Appraisal.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['supervisor','employee','audit.story','audit.user.photo','responsibilities.responsibility_type'],
    transacting: req.trx
  })

  if(!appraisal) return res.status(404).respond({
    code: 404,
    message: 'Unable to load appraisal'
  })

  res.status(200).respond(appraisal, AppraisalsSerializer)

}

export default showRoute
