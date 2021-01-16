import { expandMessage } from '@apps/analytics/services/messages/expand_message'
import { listObjects, getObject } from '@core/services/aws/s3'
import { gunzip } from '@core/services/gzip'

const AddUserAgent = {

  databaseName: 'analytics',

  up: async (knex) => {

    const req = { knex }

    await knex.schema.table('sessions', (table) => {
      table.text('useragent')
    })

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

        await knex('sessions').where('domain_sessionid', data.domain_sessionid).update({
          useragent: data.useragent
        })

      })

    })

  },

  down: async (knex) => {
  }

}

export default AddUserAgent
