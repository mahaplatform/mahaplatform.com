import ImportSerializer from '../serializers/import_serializer'
import { createAssetFromUrl } from '../services/assets'
import ImportItem from '../models/import_item'
import socket from '../../../core/services/emitter'
import { flatten, unflatten } from 'flat'
import Queue from '../../../core/objects/queue'
import knex from '../../../core/services/knex'
import Import from '../models/import'
import Asset from '../models/asset'
import moment from 'moment'
import _ from 'lodash'

const getAsset = async (trx, url, imp) => {

  const asset_match = url.match(/\/assets\/(\d*)\/.*$/)

  if(asset_match !== null) {
    return await Asset.where({
      id: asset_match[1]
    }).fetch({
      transacting: trx
    })
  }

  if(url.match(/^\d*$/) !== null) {
    return await Asset.where({
      id: url
    }).fetch({
      transacting: trx
    })
  }

  return await createAssetFromUrl({ trx }, {
    team_id: imp.get('team_id'),
    user_id: imp.get('user_id'),
    url
  })

}

const castColumn = (tablename, column, code) => {
  if(tablename == 'sites_items' && column == 'values') return `${column}->'${code}'->>0`
  return `${column}->>'${code}'`
}

const getKey = async (trx, parent_id, name) => {
  const row = await knex('maha_fields').transacting(trx).select('code').where({ parent_id, name })
  return row.length > 0 ? row[0].code : null
}

const findRelatedId = async (trx, tablename, fieldname, value, team_id, parent_id) => {
  if(!tablename || !fieldname) return null
  const [column, field] = fieldname.split('.')
  const code = parent_id ? await getKey(trx, parent_id, field) : field
  const castCode = castColumn(tablename, column, code)
  const related = await knex(tablename).transacting(trx).where({ team_id }).whereRaw(`lower(${castCode}) = ?`, value)
  return related.length > 0 ? related[0].id : null
}

const mergeRecords = (item, duplicate, strategy) => {
  if(strategy == 'overwrite'){
    return _.merge(duplicate, item)
  } else if(strategy == 'discard') {
    return _.merge(item, duplicate)
  }
}

const processor = async (job, trx) => {

  const imp = await Import.where({
    id: job.data.id
  }).fetch({
    transacting: trx
  })

  const items = await ImportItem.where({
    import_id: imp.id
  }).fetchAll({
    transacting: trx
  }).then(results => results.toArray())

  const table = imp.get('object_type')

  const mapping = imp.get('mapping')

  const strategy = imp.get('strategy')

  await Promise.mapSeries(items, async (item, index) => {

    const src_values = item.get('values')

    const values = await Promise.reduce(Object.keys(src_values), async (values, key) => {

      const { type, relation, relationcolumn, relationtypeid } = _.find(mapping, ['field', key])

      if(type === 'upload' && src_values[key].length > 0) {

        const asset = await getAsset(trx, src_values[key], imp)

        values[key] = asset ? asset.id : null

      } else if(type === 'relation') {

        const items = src_values[key].split(',')

        const related_ids = await Promise.mapSeries(items, async (item, index) => {
          const value = item.toString().toLowerCase().trim()
          const related_id = await findRelatedId(trx, relation, relationcolumn, value, imp.get('team_id'), relationtypeid)
          return related_id
        })

        values[key] = items.length > 1 ? related_ids : related_ids[0]

      } else {

        values[key] = src_values[key]

      }

      return values

    }, [] )

    const primary_key = job.data.primaryKey

    const duplicate = (primary_key) ? await knex(table).transacting(trx).where({
      [primary_key]: values[primary_key]
    }) : []

    let object_id = null

    if(duplicate.length === 0 || strategy == 'create') {

      object_id = await knex(table).transacting(trx).insert({
        team_id: imp.get('team_id'),
        created_at: moment(),
        updated_at: moment(),
        ...job.data.defaultParams,
        ...unflatten(values)
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
      }, {
        patch: true,
        transacting: trx
      })
    }

    await imp.save({
      completed_count: index + 1
    }, {
      patch: true,
      transacting: trx
    })

    await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
      target: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: ImportSerializer(null, imp)
    })

  })

  await imp.save({
    created_count: items.length,
    stage: 'complete'
  }, {
    patch: true,
    transacting: trx
  })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, imp)
  })

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
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default ImportProcessQueue
