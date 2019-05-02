import ImportSerializer from '../serializers/import_serializer'
import { createAssetFromUrl } from '../services/asset'
import ImportItem from '../models/import_item'
import socket from '../core/services/emitter'
import { flatten, unflatten } from 'flat'
import Queue from '../core/objects/queue'
import knex from '../core/services/knex'
import Import from '../models/import'
import moment from 'moment'
import _ from 'lodash'

const processor = async (job, trx) => {

  const imp = await Import.where({
    id:job.data.id
  }).fetch({
    transacting:trx
  })

  const items = await ImportItem.where({
    import_id: imp.id
  }).fetchAll({
    transacting: trx
  })

  const table = imp.get('object_type')

  const mapping = imp.get('mapping')

  const strategy = imp.get('strategy')

  const mergeRecords = (item, duplicate, strategy) => {
    if(strategy == 'overwrite'){
      return _.merge(duplicate, item)
    } else if(strategy == 'discard') {
      return _.merge(item, duplicate)
    }
  }

  await Promise.mapSeries(items.toArray(), async (item, index) => {

    const src_values = item.get('values')

    const values = await Promise.reduce(Object.keys(src_values), async (values, key) => {

      const type = _.find(mapping, ['field', key]).type

      if(type === 'upload' && src_values[key].length > 0){

        const asset = await createAssetFromUrl(job, trx, src_values[key], imp.get('team_id'), imp.get('user_id'))

        if(!asset){
          values[key] = null
        } else {
          values[key] = asset.id
        }

      } else if(type === 'relation'){

        const relation = _.find(mapping, ['field', key]).relation
        const relationcolumn = _.find(mapping, ['field', key]).relationcolumn
        const relationtypeid = _.find(mapping, ['field', key]).relationtypeid

        let relationIds = []

        if( src_values[key].indexOf(',') > -1 ){
          relationIds = await Promise.mapSeries(src_values[key].split(','), async (src_value, index) => {
            return await findRelatedId(job, trx, relation, relationcolumn, src_value, imp.get('team_id'), relationtypeid)
          })
        } else {
          relationIds = await findRelatedId(job, trx, relation, relationcolumn, src_values[key], imp.get('team_id'), relationtypeid)
        }

        values[key] = relationIds

      } else {

        values[key] = src_values[key]

      }

      return values

    }, [] )

    const primary_key = job.data.primaryKey

    const duplicate = (primary_key) ? await knex(table).transacting(trx).where({ [primary_key]: values[primary_key] }) : 0

    let object_id = null

    if(!duplicate.length || strategy == 'create'){

      object_id = await knex(table).transacting(trx).insert({
        team_id: imp.get('team_id'),
        created_at: moment(),
        updated_at: moment(),
        ...job.data.defaultParams,
        ...unflatten({ ...values })
      }).returning('id')

    } else if( strategy != 'ignore' ) {

      const fields = _.compact(_.map(mapping, 'field'))

      const item_fields = _.pickBy(_.pick(flatten(item.attributes.values), fields), _.identity)

      const duplicate_fields = _.pickBy(_.pick(flatten(duplicate[0]), fields), _.identity)

      const merged = mergeRecords(item_fields, duplicate_fields, strategy)

      object_id = await knex(table).where({
        id: duplicate[0].id
      }).update({
        ...unflatten( _.merge(flatten(duplicate[0]), merged) )
      }).returning('id')

    }

    if(object_id){
      await item.save({
        object_id: parseInt(object_id)
      }, { patch: true, transacting: trx })
    }

    await imp.save({
      completed_count: index+1
    }, { patch: true, transacting: trx })

    await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
      target: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: ImportSerializer(null, null, imp)
    })

  })

  await imp.save({
    created_count: items.length,
    stage: 'complete'
  }, { patch: true, transacting: trx })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, null, imp)
  })

}

const findRelatedId = async (job, trx, tablename, fieldname, value, team_id, typeid) => {

  if(!tablename || !fieldname) return null

  const column = fieldname.split('.')[0]
  const field = fieldname.split('.')[1]

  const castColumn = (code) => {
    // if( fieldname.indexOf('.') < 0 ) return fieldname
    // const column = fieldname.split('.')[0]
    // const jsonbkey = fieldname.split('.')[1]
    if(tablename == 'sites_items' && column == 'values'){
      return `${column}->'${code}'->>0`
    } else {
      return `${column}->>'${code}'`
    }

  }

  const getJsonbkey = async (typeid, field) => {
    console.log('typeid is ', typeid)
    console.log('field is ', field)
    const row = await knex('maha_fields').transacting(trx).select('code').whereRaw('parent_id = ? AND name = ?', [typeid, field])
    return row[0] ? row[0].code : null
  }

  const code = await getJsonbkey(typeid, field)

  const related = await knex(tablename).transacting(trx).whereRaw(`team_id = ? AND LOWER(${castColumn(code)}) = ?`, [team_id, value.toString().toLowerCase().trim()])

  const id = related[0] ? related[0].id : null

  return id

}

const failed = async (job, err) => {

  await socket.in(`/admin/imports/${job.data.id}`).emit('message', {
    target: `/admin/imports/${job.data.id}`,
    action: 'failed',
    data: [job,err]
  })

}

const ImportProcessQueue = new Queue({
  name: 'import_process',
  enqueue: async (req, trx, job) => job,
  processor,
  failed
})

export default ImportProcessQueue
