import AppraisalsSerializer from '../../../serializers/appraisal_serializer'
import Appraisal from '../../../models/appraisal'

const showRoute = async (req, res) => {

  const appraisal = await Appraisal.scope({
    team: req.team
  }).query(qb => {
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
