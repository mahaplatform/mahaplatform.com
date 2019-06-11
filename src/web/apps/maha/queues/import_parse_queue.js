import ImportSerializer from '../serializers/import_serializer'
import ImportItem from '../models/import_item'
import socket from '../../../core/services/emitter'
import Queue from '../../../core/objects/queue'
import knex from '../../../core/services/knex'
import parse from '../../../core/utils/parse'
import Import from '../models/import'
import Checkit from 'checkit'
import _ from 'lodash'

const validate = async (rules, values) => {

  try {

    await Checkit(rules).run(values)

  } catch(e){

    return false

  }

  return true

}

const processor = async (job, trx) => {

  const imp = await Import.where({
    id: job.data.id
  }).fetch({
    withRelated: ['asset'],
    transacting:trx
  })

  const parsed = await parse({
    asset: imp.related('asset'),
    quote: imp.get('quote'),
    delimiter: imp.get('delimiter'),
    headers: imp.get('headers')
  })

  const result = await Promise.reduce(parsed.rows, async (result, row, i) => {

    const values = imp.get('mapping').reduce((mapped, mapping, j) => {

      if(!mapping.field) return mapped

      return {
        ...mapped,
        [mapping.field]: row[j]
      }

    }, {})

    const primary_key = job.data.primaryKey

    // if(primary_key){
    //   const duplicate = await knex(job.data.table).transacting(trx).where({
    //     primary_key: values[primary_key]
    //   })
    // } else {
    //   const duplicate = 0
    // }

    const duplicate = (primary_key) ? await knex(job.data.table).transacting(trx).where({[primary_key]: values[primary_key]}) : 0

    const is_valid = await validate(job.data.rules, values)

    const is_duplicate = (primary_key) ? duplicate.length > 0 : false

    const is_nonunique = (primary_key) ? _.includes(result.primarykeys, values[primary_key]) : false

    await ImportItem.forge({
      import_id: imp.get('id'),
      values,
      is_valid,
      is_duplicate,
      is_nonunique
    }).save(null, { transacting: trx })

    await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
      target: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: {
        completed: i + 1,
        total: parsed.rows.length
      }
    })

    return {
      duplicate: (is_valid && is_duplicate) ? result.duplicate + 1 : result.duplicate,
      valid: (is_valid && !is_duplicate && !is_nonunique) ? result.valid + 1 : result.valid,
      error: !is_valid ? result.error + 1 : result.error,
      nonunique: is_nonunique ? result.nonunique + 1 : result.nonunique,
      primarykeys: !is_nonunique ? [...result.primarykeys,values[primary_key]] : result.primarykeys
    }

  }, {
    duplicate: 0,
    valid: 0,
    error: 0,
    nonunique: 0,
    primarykeys: []
  })

  await imp.save({
    item_count: parsed.rows.length,
    valid_count: result.valid,
    omit_count: 0,
    error_count: result.error,
    nonunique_count: result.nonunique,
    duplicate_count: result.duplicate,
    stage: 'validating'
  }, { patch: true, transacting: trx })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, null, imp)
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
  name: 'import_parse',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default ImportParseQueue
