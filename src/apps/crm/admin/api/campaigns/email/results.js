import EmailResultSerializer from '../../../../serializers/email_result_serializer'
import EmailCampaign from '../../../../models/email_campaign'
import EmailResult from '../../../../models/email_result'

const resultsRoute = async (req, res) => {

  const campaign = await EmailCampaign.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const result = await EmailResult.scope({
    team: req.team
  }).query(qb => {
    qb.where('email_campaign_id', campaign.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(!result) return res.status(200).respond(true)

  res.status(200).respond(result, EmailResultSerializer)

}

export default resultsRoute
