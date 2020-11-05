import ImportSerializer from '../serializers/import_serializer'
import { createAssetFromUrl } from '../services/assets'
import ImportItem from '../models/import_item'
import socket from '@core/services/emitter'
import { flatten, unflatten } from 'flat'
import Queue from '@core/objects/queue'
import knex from '@core/services/knex'
import Import from '../models/import'
import Asset from '../models/asset'
import moment from 'moment'
import _ from 'lodash'

const getAssetId = async (trx, url, imp) => {

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

  const asset = await createAssetFromUrl({ trx }, {
    team_id: imp.get('team_id'),
    user_id: imp.get('user_id'),
    url
  })

  return asset ? asset.id : null

}

const castColumn = (tablename, column, code) => {
  if(tablename == 'sites_items' && column == 'values') return `${column}->'${code}'->>0`
  return `${column}->>'${code}'`
}

const getKey = async (trx, parent_id, name) => {
  const row = await knex('maha_fields').transacting(trx).select('code').where({ parent_id, name })
  return row.length > 0 ? row[0].code : null
}

const findRelatedIds = async (trx, field, values, imp ) => {
  if(!field.relation || !field.relationcolumn) return null
  const [column, name] = field.relationcolumn.split('.')
  const code = field.relationtypeid ? await getKey(trx, field.relationtypeid, name) : name
  const castCode = castColumn(field.relation, column, code)
  const items = values.split(',')
  const related_ids = await Promise.mapSeries(items, async (item, index) => {
    const value = item.toString().toLowerCase().trim()
    const related = await knex(field.relation).transacting(trx).where({
      team_id: imp.get('team_id')
    }).whereRaw(`lower(${castCode}) = ?`, value)
    return related.length > 0 ? related[0].id : null
  })
  return items.length > 1 ? related_ids : related_ids[0]
}

const processValue = async(trx, imp, key, value) => {
  const field = _.find(imp.get('mapping'), { field: key })
  if(field.type === 'upload') {
    return value.length > 0 ? await getAssetId(trx, value, imp) : null
  }
  if(field.type === 'relation') {
    return await findRelatedIds(trx, field, value, imp)
  }
  return value
}

const mergeRecords = (item, duplicate, strategy) => {
  if(strategy == 'overwrite'){
    return _.merge(duplicate, item)
  } else if(strategy == 'discard') {
    return _.merge(item, duplicate)
  }
}

const processor = async (req, job) => {

  const imp = await Import.where({
    id: job.data.id
  }).fetch({
    transacting: req.trx
  })

  const items = await ImportItem.where({
    import_id: imp.id
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const table = imp.get('object_type')

  const mapping = imp.get('mapping')

  const strategy = imp.get('strategy')

  await Promise.mapSeries(items, async (item, index) => {

    const src_values = item.get('values')

    const values = await Promise.reduce(Object.keys(src_values), async (values, key) => ({
      ...values,
      [key]: await processValue(req.trx, imp, key, src_values[key])
    }), {}).then(values => unflatten(values))

    const primary_key = job.data.primaryKey

    const duplicate = (primary_key) ? await knex(table).transacting(req.trx).where({
      [primary_key]: values[primary_key]
    }) : []

    let object_id = null

    let is_merged = false

    let is_ignored = false

    if(duplicate.length === 0 || strategy == 'create') {

      object_id = await knex(table).transacting(req.trx).insert({
        team_id: imp.get('team_id'),
        created_at: moment(),
        updated_at: moment(),
        ...job.data.defaultParams,
        ...values
      }).returning('id')

    } else if( strategy != 'ignore' ) {

      const fields = _.compact(_.map(mapping, 'field'))

      const item_fields = _.pickBy(_.pick(flatten(item.attributes.values), fields), _.identity)

      const duplicate_fields = _.pickBy(_.pick(flatten(duplicate[0]), fields), _.identity)

      const merged = mergeRecords(item_fields, duplicate_fields, strategy)

      object_id = await knex(table).where({
        id: duplicate[0].id
      }).update({
        ...unflatten(_.merge(flatten(duplicate[0]), merged) )
      }).returning('id')

      is_merged = true

    } else {

      is_ignored = true

    }

    await item.save({
      object_id: object_id ? parseInt(object_id) : null,
      is_complete: true,
      is_merged,
      is_ignored
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
      action: 'progress',
      data: ImportSerializer(null, _import)
    })

  })

  await imp.save({
    stage: 'complete'
  }, {
    transacting: req.trx,
    patch: true
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
  processor,
  failed
})

export default ImportProcessQueue
