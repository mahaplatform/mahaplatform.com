// ssh -i ~/.ssh/mahaplatform -L 127.0.0.1:1234:127.0.0.1:5432 centos@3.208.31.159

import './core/vendor/sourcemaps'
import './core/services/environment'
// import knex from './core/vendor/knex'
// import { buildWebsite, publishWebsite } from '@apps/websites/services/websites'
// import moment from 'moment'
// import _ from 'lodash'
import twilio from '@core/vendor/twilio'

const processor = async () => {
  // await knex.transaction(async(trx) => {
  // })
  const req = {}

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

  console.log(await twilio.calls('CAca47f2c4285b071004b1487dc0ee30d6').fetch())

}

processor().then(process.exit)
