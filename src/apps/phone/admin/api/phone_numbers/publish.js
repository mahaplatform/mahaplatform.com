import { renderCampaign } from '@apps/campaigns/services/voice_campaigns'
import { publishVersion } from '@apps/maha/services/versions'
import PhoneNumber from '@apps/maha/models/phone_number'
import socket from '@core/services/routes/emitter'

const publishRoute = async (req, res) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  if(!phone_number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load phone number'
  })

  const version = await publishVersion(req, {
    versionable_type: 'maha_phone_numbers',
    versionable_id: phone_number.get('id'),
    key: 'config',
    id: req.body.publish_id
  })

  await socket.refresh(req, [
    `/admin/maha_phone_numbers/${phone_number.get('id')}/config/versions`
  ])

  const config = await renderCampaign(req, {
    code: phone_number.get('code'),
    config: version.get('value')
  })

  await phone_number.save({
    config
  },{
    transacting: req.trx,
    patch: true
  })

  res.status(200).respond(true)

}


export default publishRoute
