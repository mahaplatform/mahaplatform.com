import ImportSerializer from '../serializers/import_serializer'
import { isValid } from '@core/utils/validation'
import socket from '@core/vendor/emitter'
import Queue from '@core/objects/queue'
import ImportItem from '../models/import_item'
import parse from '@core/utils/parse'
import Import from '../models/import'
import _ from 'lodash'

const processor = async (req, job) => {

  const imp = await Import.where({
    id: job.data.id
  }).fetch({
    withRelated: ['asset'],
    transacting: req.trx
  })

  const parsed = await parse({
    asset: imp.related('asset'),
    quote: imp.get('quote'),
    delimiter: imp.get('delimiter'),
    headers: imp.get('headers')
  })

  await Promise.reduce(parsed.rows, async (result, row, i) => {

    const values = imp.get('mapping').reduce((mapped, mapping, j) => {
      if(!mapping || !mapping.field) return mapped
      return {
        ...mapped,
        [mapping.field]: row[j]
      }
    }, {})

    const primary_key = job.data.primaryKey

    const duplicate = (primary_key) ? await req.trx(job.data.table).where({
      [primary_key]: values[primary_key]
    }) : 0

    const is_valid = await isValid(job.data.rules, values)

    const is_duplicate = (primary_key) ? duplicate.length > 0 : false

    const is_nonunique = (primary_key) ? _.includes(result.primarykeys, values[primary_key]) : false

    const is_empty = Object.values(values).length === 0

    await ImportItem.forge({
      import_id: imp.get('id'),
      values,
      is_valid,
      is_duplicate,
      is_nonunique,
      is_empty
    }).save(null, {
      transacting: req.trx
    })

    await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
      target: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: {
        completed: i + 1,
        total: parsed.rows.length
      }
    })

    return {
      primarykeys: !is_nonunique ? [...result.primarykeys,values[primary_key]] : result.primarykeys
    }

  }, {
    primarykeys: []
  })

  await imp.save({
    stage: 'validating'
  }, {
    transacting: req.trx,
    patch: true
  })

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('maha_imports.id', imp.get('id'))
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, _import)
  })

}

const failed = async (job, err) => {
  await socket.in(`/admin/imports/${job.data.id}`).emit('message', {
    target: `/admin/imports/${job.data.id}`,
    action: 'failed',
    data: [job,err]
  })
}

const ImportParseQueue = new Queue({
  queue: 'worker',
  name: 'import_parse',
  processor,
  failed
})

export default ImportParseQueue
