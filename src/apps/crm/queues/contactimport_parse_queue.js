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

const PHONE_REGEX = /(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/g

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

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

  const getValue = (mapping, value) => {
    if(!value) return null
    if(mapping.field === 'full_name') {
      const parts = value.split(' ')
      return {
        first_name: parts[0],
        last_name: parts.slice(1).join(' ')
      }
    } else if(mapping.field.match(/^address_\d{1}$/)) {
      console.log(mapping.field, value)
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
        birthday: value ? moment(value).format('MM/DD') : null
      }
    } else {
      return {
        [mapping.field]: value
      }
    }
  }

  const extract = (values, prefix, regex) => {
    return Array(3).fill(0).reduce((all, n, i) => {
      if(!values[`${prefix}_${i+1}`]) return all
      const items = values[`${prefix}_${i+1}`].match(regex, values[`${prefix}_${i+1}`])
      return [
        ...all,
        ...items || []
      ]
    }, []).reduce((numbers, number, i) => ({
      ...numbers,
      [`${prefix}_${i+1}`]: number
    }), {})
  }

  const getMapped = (imp, row) => {
    return imp.get('mapping').reduce((mapped, mapping, i) => {
      if(!mapping || !mapping.field) return mapped
      return {
        ...mapped,
        ...getValue(mapping, row[i])
      }
    }, {})

  }

  await Promise.reduce(parsed.rows, async (primarykeys, row, i) => {

    const mapped = getMapped(imp, row)

    const values = {
      ...mapped,
      ...extract(mapped, 'phone', PHONE_REGEX),
      ...extract(mapped, 'email', EMAIL_REGEX)
    }

    const addresses = Object.keys(values).filter(key => {
      return key.match(/^email_/) !== null
    }).map(key => {
      return values[key]
    })

    const duplicate = values.email_1 ? await knex('crm_email_addresses').transacting(req.trx).whereIn('address', addresses) : []

    const is_valid = await isValid({
      email_1: ['email']
    }, values)

    const is_nonunique = values.email_1 !== undefined && _.includes(primarykeys, values.email_1)

    const is_duplicate = !is_nonunique ? duplicate.length > 0 : false

    await ImportItem.forge({
      import_id: imp.get('id'),
      values,
      is_valid,
      is_duplicate,
      is_nonunique
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

    return [
      ...primarykeys,
      ...(values.email_1 !== undefined && !is_nonunique) ? [values.email_1] : []
    ]

  }, [])

  await imp.save({
    stage: 'validating'
  }, {
    patch: true,
    transacting: req.trx
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

const ContactImportParseQueue = new Queue({
  name: 'contactimport_parse',
  processor,
  failed
})

export default ContactImportParseQueue
