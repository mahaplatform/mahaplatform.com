import s3 from '@core/services/s3'
import csvparse from 'csv-parse/lib/sync'

const getRows = async (filename) => {

  const contents = await s3.getObject({
    Bucket: 'cdn.mahaplatform.com',
    Key: `data/${filename}.tsv`
  }).promise().then(result => result.Body.toString())

  return csvparse(contents, {
    delimiter: "\t"
  })

}

const MigrateVendors = {

  up: async (knex) => {

    await Promise.mapSeries(getRows('users_vendors'), async(row, index) => {

      if(index === 0) return

      const [ id, , , , new_vendor_id ] = row

      if(!new_vendor_id) return

      const user = await knex('maha_users').where('id', id)

      await knex('maha_users').where('id', id).update({
        values: {
          ...user[0].values,
          vendor_id: new_vendor_id
        }
      })

    })

    await Promise.mapSeries(getRows('vendors_vendors'), async(row, index) => {

      if(index === 0) return

      const [ id, , , new_vendor_id ] = row

      if(!new_vendor_id) return

      const user = await knex('finance_vendors').where('id', id)

      await knex('finance_vendors').where('id', id).update({
        integration: {
          ...user[0].integration,
          vendor_id: new_vendor_id
        }
      })

    })

  },

  down: async (knex) => {
  }

}

export default MigrateVendors
