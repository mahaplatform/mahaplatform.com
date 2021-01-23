// ssh -i ~/.ssh/mahaplatform -L 127.0.0.1:1234:127.0.0.1:5432 centos@3.208.31.159

import './core/vendor/sourcemaps'
import './core/services/environment'
// import knex from './core/vendor/knex'
import { buildWebsite, publishWebsite } from '@apps/websites/services/websites'
import moment from 'moment'
import _ from 'lodash'

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

  const config = JSON.parse(`{
    "steps": [
      { "say": "Foo" },
      { "verb": "gather", "say": "Press one or two", "answers": [
        { "number": 1, "steps": [
          { "say": "You pressed one" },
          { "say": "Good job" }
        ] },
        { "number": 2, "steps": [
          { "say": "You pressed two" },
          { "say": "Good job" }
        ] }
      ] },
      { "verb": "hangup"}
    ]
  }`)


  const getNextUrl = (steps, state) => {
    const parts = state.split('.')
    const next = state.split('.').reverse().reduce((newstate, part, index) => {
      if(newstate !== null || !/^\d$/.test(part)) return newstate
      const next = parts.slice(0, parts.length - index)
      next[next.length - 1] = parseInt(next[next.length - 1]) + 1
      const candidate = next.join('.')
      return _.get(steps, candidate) !== undefined ? candidate : null
    }, null)
    return`/call?state=${next}`
  }

  const next = getNextUrl(config.steps, '0')

  console.log(next)



}

processor().then(process.exit)
