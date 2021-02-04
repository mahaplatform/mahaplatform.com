import { upload } from '@core/services/aws/s3'

const uploadConfig = async (req, { phone_number, config }) => {

  await upload(null, {
    acl: 'private',
    bucket: process.env.AWS_BUCKET,
    key: `/twiml/voice/inbound/${phone_number.get('number')}`,
    cache_control: 'max-age=0,no-cache',
    content_type: 'application/json',
    file_data: await getSegment(req, {
      steps: config.steps,
      parent: null,
      answer: null
    })
  })

}

export default uploadConfig
