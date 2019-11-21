import s3 from '../../../../core/services/s3'
import csvparse from 'csv-parse/lib/sync'

const MigrateProjects = {

  up: async (knex) => {

    const contents = await s3.getObject({
      Bucket: 'cdn.mahaplatform.com',
      Key: 'data/projects.tsv'
    }).promise().then(result => result.Body.toString())

    const rows = csvparse(contents, {
      delimiter: "\t"
    })

    await Promise.mapSeries(rows, async(row, index) => {

      if(index === 0) return

      const [ project_code, title, county_project_code, program_code, source_code, main_project_code ] = row

      const result = await knex('finance_projects').whereRaw('integration->>\'project_code\' = ?', project_code)

      if(result.length === 0) return

      const project = result[0]

      const { integration } = project

      await knex('finance_projects').where({
        id: project.id
      }).update({
        title,
        integration: {
          program_code,
          source_code,
          project_code: county_project_code,
          match: integration.match,
          main_project_code
        }
      })

    })

  },

  down: async (knex) => {
  }

}

export default MigrateProjects
