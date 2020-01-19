import ImportSerializer from '../../maha/serializers/import_serializer'
import { isValid } from '../../../core/utils/validation'
import ImportItem from '../../maha/models/import_item'
import socket from '../../../core/services/emitter'
import Queue from '../../../core/objects/queue'
import knex from '../../../core/services/knex'
import parse from '../../../core/utils/parse'
import Import from '../../maha/models/import'
import { parseLocation } from 'parse-address'
import moment from 'moment'
import _ from 'lodash'

const processor = async (job, trx) => {

  const imp = await Import.where({
    id: job.data.id
  }).fetch({
    withRelated: ['asset'],
    transacting: trx
  })

  const parsed = await parse({
    asset: imp.related('asset'),
    quote: imp.get('quote'),
    delimiter: imp.get('delimiter'),
    headers: imp.get('headers')
  })

  const getMapped = (mapping, value) => {
    if(!value) return null
    if(mapping.field === 'full_name') {
      const parts = value.split(' ')
      return {
        first_name: parts[0],
        last_name: parts.slice(1).join(' ')
      }
    } else if(mapping.field.match(/^address/)) {
      const { number, prefix, street, type, sec_unit_type, sec_unit_num, city, state, zip, plus4 } = parseLocation(value)
      return {
        [`${mapping.field}_street_1`]: [number,prefix,street,type].filter(val => val !== undefined).join(' '),
        [`${mapping.field}_street_2`]: [sec_unit_type,sec_unit_num].filter(val => val !== undefined).join(' '),
        [`${mapping.field}_city`]: city,
        [`${mapping.field}_state_province`]: state,
        [`${mapping.field}_postal_code`]: [zip,plus4].filter(val => val !== undefined).join('-')
      }
    } else if(mapping.field === 'birthday') {
      return {
        birthday: moment(value).format('MM/DD')
      }
    } else {
      return {
        [mapping.field]: value
      }
    }
  }

  await Promise.reduce(parsed.rows, async (result, row, i) => {

    const values = imp.get('mapping').reduce((mapped, mapping, j) => {
      if(!mapping || !mapping.field) return mapped

      return {
        ...mapped,
        ...getMapped(mapping, row[j])
      }
    }, {})

    const primary_key = job.data.primaryKey

    const duplicate = (primary_key) ? await knex(job.data.table).transacting(trx).where({
      [primary_key]: values[primary_key]
    }) : 0

    const is_valid = await isValid(job.data.rules, values)

    const is_duplicate = (primary_key) ? duplicate.length > 0 : false

    const is_nonunique = (primary_key) ? _.includes(result.primarykeys, values[primary_key]) : false

    await ImportItem.forge({
      import_id: imp.get('id'),
      values,
      is_valid,
      is_duplicate,
      is_nonunique
    }).save(null, {
      transacting: trx
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
    patch: true,
    transacting: trx
  })

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('maha_imports.id', imp.get('id'))
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: trx
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

const ContactImportParseQueue = new Queue({
  name: 'contactimport_parse',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default ContactImportParseQueue
