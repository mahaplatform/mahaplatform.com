import File from '@apps/drive/models/file'

const CacheFileName = {

  databaseName: 'maha',

  up: async (knex) => {

    const files = await File.fetchAll({ withRelated: ['current_version.asset'] })

    await Promise.mapSeries(files.toArray(), async file => {

      await file.save({ file_name: file.related('current_version').related('asset').get('original_file_name') }, { patch: true })

    })

  },

  down: async (knex) => {}

}

export default CacheFileName
