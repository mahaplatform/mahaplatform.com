import Asset from '../models/asset'
import Field from '../models/field'
import Link from '../models/link'
import geocode from './geocode'
import Checkit from 'checkit'
import _ from 'lodash'

export const processValues = async (parent_type, parent_id, data, trx) => {

  const fields = await Field.query(qb => {
    qb.where('parent_type', parent_type)
    qb.where('parent_id', parent_id)
  }).fetchAll({ transacting: trx }).then(result => result.toArray())

  const errors = await validate(fields, data)

  if(errors) throw new Error({
    code: 422,
    message: 'Unable to complete request',
    errors: errors.toJSON()
  })

  const transformed = await transformValues(fields, data, trx)

  return transformed

}

const validate = async (fields, data) => {

  const rules = fields.reduce((rules, field) => {

    const comparisons = ['greaterThanEqualTo','lessThanEqualTo','maxLength','minLength']

    const types = ['email','url']

    const config = field.get('config')

    const fieldRules = []

    if(config.is_required) fieldRules.push({
      rule: 'required',
      label: field.get('name')
    })

    comparisons.map(comparison => {

      if(!config[comparison]) return

      fieldRules.push({
        rule: `${comparison}:${config.min}`,
        label: field.get('name')
      })

    })

    types.map(type => {

      if(field.get('type') !== `${type}field`) return

      fieldRules.push({
        rule: type,
        label: field.get('name')
      })

    })

    if(fieldRules.length === 0) return rules

    return {
      ...rules,
      [field.get('code')]: fieldRules
    }

  }, {})

  if(Object.keys(rules).length === 0) return null

  const checkit = new Checkit(rules)

  const [errors] = checkit.runSync(data)

  return errors

}

const transformValues = async (fields, values, trx) => {

  const fieldMap = fields.reduce((fieldMap, field) => ({
    ...fieldMap,
    [field.get('code')]: field
  }), {})

  return await Promise.reduce(Object.keys(values), async (transformed, key) => {

    const value = values[key]

    const field = fieldMap[key]

    const transformedValue = await transformValue(field, value, trx)

    return {
      ...transformed,
      [key]: _.castArray(transformedValue)
    }

  }, {})

}

const transformValue = async (field, value, trx) => {

  if(!value) return null

  if(field.get('type') === 'addressfield') {

    const required = ['street1','city','province']

    const valid = required.reduce((valid, field) => {

      if(!valid) return false

      return value[field] !== undefined && value[field].length > 0

    }, true)

    if(!valid) return null

    return {
      ...value,
      ...await geocode(value)
    }

  } else if(_.includes(['numberfield','moneyfield'], field.get('type'))) {

    return parseFloat(value)

  }

  return value

}

export const expandValues = async (parent_type, parent_id, data, trx) => {

  const fields = await Field.query(qb => {
    qb.where('parent_type', parent_type)
    qb.where('parent_id', parent_id)
  }).fetchAll({ transacting: trx })

  const fieldMap = fields.toArray().reduce((map, field) => ({
    ...map,
    [field.get('code')]: field
  }), {})

  return await Promise.reduce(Object.keys(data), async (values, code) => {

    const getValue = async (code) => {

      if(!data[code][0]) return null

      const field = fieldMap[code]

      if(field.get('type') === 'lookup') {
        return field.get('config').multiple === true ? data[code] : data[code][0]
      }

      if(field.get('type') === 'moneyfield') {
        return data[code][0].toFixed(2)
      }

      if(field.get('type') === 'videofield') {

        const link = await Link.where({
          id: data[code][0]
        }).fetch({
          withRelated: ['service'],
          transacting: trx
        })

        return {
          title: link.get('title'),
          text: link.get('text'),
          service: link.related('service').get('text'),
          url: link.get('url'),
          width: link.get('video_width'),
          height: link.get('video_height')
        }

      }

      if(field.get('type') === 'imagefield') {

        const asset = await Asset.where({
          id: data[code][0]
        }).fetch({ transacting: trx })

        return {
          content_type: asset.get('content_type'),
          file_name: asset.get('file_name'),
          file_size: asset.get('file_size'),
          url: asset.get('url')
        }

      }

      return data[code][0]

    }

    return {
      ...values,
      [fieldMap[code].get('name')]: await getValue(code)
    }

  }, {})

}
