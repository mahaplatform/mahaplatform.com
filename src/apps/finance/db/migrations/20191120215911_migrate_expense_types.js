import s3 from '../../../../core/services/s3'
import csvparse from 'csv-parse/lib/sync'

const MigrateExpenseTypes = {

  up: async (knex) => {

    const contents = await s3.getObject({
      Bucket: 'cdn.mahaplatform.com',
      Key: 'data/expense_types.tsv'
    }).promise().then(result => result.Body.toString())

    const rows = csvparse(contents, {
      delimiter: "\t"
    })

    await Promise.mapSeries(rows, async(row, index) => {

      if(index === 0) return

      const [ title, description, old_expense_code, old_source_code, new_expense_code, new_source_code ] = row

      if(old_expense_code) {

        const result = await knex('finance_expense_types').whereRaw('integration->>\'expense_code\' = ?', old_expense_code)

        await knex('finance_expense_types').where({
          id: result[0].id
        }).update({
          title,
          description,
          integration: {
            expense_code: new_expense_code || old_expense_code,
            source_code: new_source_code || old_source_code
          }
        })

      } else {

        await knex('finance_expense_types').insert({
          team_id: 1,
          title,
          description,
          integration: {
            expense_code: new_expense_code || old_expense_code,
            source_code: new_source_code || old_source_code
          },
          is_active: 1
        })

      }

    })

  },

  down: async (knex) => {
  }

}

export default MigrateExpenseTypes
