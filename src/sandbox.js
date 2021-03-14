// ssh -i ~/.ssh/mahaplatform -L 127.0.0.1:1234:127.0.0.1:5432 centos@3.208.31.159

import '@core/services/environment'
import knex from '@core/vendor/knex/maha'
// import { buildWebsite, publishWebsite } from '@apps/websites/services/websites'
// import moment from 'moment'
// import _ from 'lodash'
// import twilio from '@core/vendor/twilio'

// import { renderConfig } from '@apps/maha/services/phone_numbers'
// import { getCurrent } from '@apps/maha/services/versions'
// import PhoneNumber from '@apps/maha/models/phone_number'
// import { upload } from '@core/services/aws/s3'

// import { executeEnrollment } from '@apps/automation/services/workflows'
// import Enrollment from '@apps/automation/models/workflow_enrollment'
// import Team from '@apps/maha/models/team'

import { cloudfront } from '@core/vendor/aws'

const sandbox = async () => {

  // const config = await cloudfront.getDistributionConfig({
  //   Id: 'E3OCSGHWCPV74A'
  // }).promise()
  //
  // console.log(config.DistributionConfig.CacheBehaviors.Items[0])
  //
  // console.log('createDistribution')

  // const distribution = await createDistribution(req, {
  //   code: 'abcdef',
  //   aliases: [],
  //   aws_certificate_arn: 'arn:aws:acm:us-east-1:927906310648:certificate/ab67bf57-da6e-47a8-ac13-b9369403537d'
  // })

  // console.log('invalidateDistibution')
  //
  // await invalidateDistibution(req, {
  //   aws_cloudfront_id: distribution.aws_cloudfront_id,
  //   paths: ['/*']
  // })
  //
  // console.log('deleteDistribution')
  //
  // await deleteDistribution(req, {
  //   aws_cloudfront_id: distribution.aws_cloudfront_id
  // // })
  //
  // const hash = moment().format('YYYYMMDDHHmmss')
  //
  // await buildWebsite(req, {
  //   code: 'abcdef',
  //   hash
  // })
  //
  // await publishWebsite(req, {
  //   code: 'abcdef',
  //   hash
  // })

  // await twilio.calls.create({
  //   machineDetection: 'DetectMessageEnd',
  //   statusCallbackEvent: ['initiated','ringing','answered','completed'],
  //   statusCallback: 'https://twiml.mahaplatform.com/status',
  //   url: 'https://twiml.mahaplatform.com/voice?workflow=noyw8n852g',
  //   to: '+16072775647',
  //   from: '+16072462347'
  // })
  //
  // const phone_number = await PhoneNumber.query(qb => {
  //   qb.where('id', 1)
  // }).fetch({
  //   transacting: req.trx
  // })
  //
  // const config = await getCurrent(req, {
  //   versionable_type: 'maha_phone_numbers',
  //   versionable_id: 1,
  //   key: 'config'
  // })
  //
  // const rendered = await renderConfig(req, {
  //   phone_number,
  //   config: config.get('value')
  // })
  //
  // const result = await upload(null, {
  //   acl: 'private',
  //   bucket: process.env.AWS_BUCKET,
  //   key: `twiml/voice/inbound/${phone_number.get('number').substr(1)}`,
  //   cache_control: 'max-age=0,no-cache',
  //   content_type: 'application/json',
  //   file_data: JSON.stringify(rendered)
  // })

  const keys = await cloudfront.listPublicKeys().promise()

  console.log(keys.PublicKeyList.Items)

  // await knex.transaction(async(trx) => {
  //
    //
    // req.team = await Team.query(qb => {
    //   qb.where('id', 1)
    // }).fetch({
    //   transacting: req.trx
    // })
    //
    // const enrollment = await Enrollment.query(qb => {
    //   qb.where('id', 133904)
    // }).fetch({
    //   transacting: req.trx
    // })
    //
    // const result = await executeEnrollment(req, {
    //   enrollment_id: enrollment.get('id'),
    //   state: 'steps.0'
    // })
    //
    // console.log(result)

  // })


}

export default sandbox
