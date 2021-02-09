import { renderConfig } from '@apps/maha/services/phone_numbers'
import { updateVersion } from '@apps/maha/services/versions'
import PhoneNumber from '@apps/maha/models/phone_number'
import { upload } from '@core/services/aws/s3'

const workflowRoute = async (req, res) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.phone_number_id)
  }).fetch({
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  if(!phone_number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load phone number'
  })

  const version = await updateVersion(req, {
    versionable_type: 'maha_phone_numbers',
    versionable_id: phone_number.get('id'),
    key: 'config',
    value: req.body
  })

  const rendered = await renderConfig(req, {
    config: version.get('value')
  })

  await upload(null, {
    acl: 'private',
    bucket: process.env.AWS_BUCKET,
    key: `twiml/voice/inbound/${phone_number.get('number').substr(1)}`,
    cache_control: 'max-age=0,no-cache',
    content_type: 'application/json',
    file_data: JSON.stringify(rendered)
  })

  res.status(200).respond(true)

}

export default workflowRoute
