import ImportSerializer from '@apps/maha/serializers/import_serializer'
import { isValidNumber } from '@core/services/phone_numbers'
import ImportItem from '@apps/maha/models/import_item'
import { isValid } from '@core/utils/validation'
import Import from '@apps/maha/models/import'
import { parseLocation } from 'parse-address'
import socket from '@core/vendor/emitter'
import { matchContact } from './utils'
import parse from '@core/utils/parse'
import moment from 'moment'
import _ from 'lodash'
const PHONE_REGEX = /(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/g

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i

const parseContactImport = async (req, { import_id }) => {

  const imp = await Import.where({
    id: import_id
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
    } else if(mapping.field === 'last_first') {
      const matches = value.match(/(.*),\s?(.*)/)
      if(!matches) return {}
      return {
        first_name: matches[2],
        last_name: matches[1]
      }
    } else if(mapping.field.match(/^address_\d{1}$/)) {
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

  const validate = async(values) => {
    const phones = Object.keys(values).filter(key => {
      return /phone/.test(key)
    }).find(key => {
      return !isValidNumber(values[key])
    })
    if(phones) return false
    return isValid({
      email_1: ['email'],
      email_2: ['email'],
      email_3: ['email']
    }, values)
  }

  await Promise.reduce(parsed.rows, async (primarykeys, row, i) => {

    if(!row) return primarykeys

    const mapped = getMapped(imp, row)

    const values = {
      ...mapped,
      ...extract(mapped, 'phone', PHONE_REGEX),
      ...extract(mapped, 'email', EMAIL_REGEX)
    }

    const contact = await matchContact(req, {
      createContact: false,
      values
    })

    const is_valid = await validate(values)

    const is_nonunique = values.email_1 !== undefined && _.includes(primarykeys, values.email_1)

    const is_duplicate = !is_nonunique ? contact !== null : false

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
    withRelated: ['asset','program','user.photo'],
    transacting: req.trx
  })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, _import)
  })

}

export default parseContactImport
