import './core/vendor/sourcemaps'
import './core/services/environment'
import { expandMessage } from '@apps/analytics/services/messages/expand_message'
import { getUseragent } from '@apps/analytics/services/useragents'
import { listObjects, getObject } from '@core/services/aws/s3'
import { gunzip } from '@core/services/gzip'
import * as knex from '@core/vendor/knex'

knex.analytics.transaction(async analytics => {

  const req = { knex: analytics }

  const objects = await listObjects(req, {
    bucket: process.env.AWS_DATA_BUCKET,
    prefix: 'analytics'
  })

  await Promise.mapSeries(objects, async (key) => {

    const object = await getObject(req, {
      bucket: process.env.AWS_DATA_BUCKET,
      key
    })

    const unzipped = await gunzip(object.Body)

    const rows = unzipped.toString('utf8').split('\n')

    await Promise.mapSeries(rows, async (row) => {

      const data = expandMessage(row)

      const session = await analytics('sessions').where('domain_sessionid', data.domain_sessionid).then(results => {
        return results[0]
      })

      if(session) return

      const useragent = await getUseragent({ analytics }, {
        data
      })

      await analytics('sessions').where('domain_sessionid', data.domain_sessionid).update({
        useragent_id: useragent.get('id')
      })

    })

  })

}).catch(err => {})