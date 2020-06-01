import { validate } from '../../../../core/utils/validation'
import Field from '../../models/field'
import geocode from '../geocode'
import _ from 'lodash'

const processValues = async (req, { parent_type, parent_id, values }) => {

  if(!values) return {}

  const fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', parent_type)
    if(parent_id) {
      qb.where('parent_id', parent_id)
    }
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const rules = await getRules(fields)

  await validate(rules, { values })

  return await transformValues(req, fields, values)

}

const getRules = async (fields) => {

  const rules = fields.reduce((rules, field) => {

    const comparisons = ['greaterThanEqualTo','lessThanEqualTo','maxLength','minLength']

    const types = ['email','url']

    const config = field.get('config')

    const fieldRules = []

    if(config.is_required) fieldRules.push({
      rule: 'required',
      label: field.get('name').token
    })

    comparisons.map(comparison => {

      if(!config[comparison]) return

      fieldRules.push({
        rule: `${comparison}:${config.min}`,
        label: field.get('name').token
      })

    })

    types.map(type => {

      if(field.get('type') !== `${type}field`) return

      fieldRules.push({
        rule: type,
        label: field.get('name').token
      })

    })

    if(fieldRules.length === 0) return rules

    return {
      ...rules,
      [`values.${field.get('code')}`]: fieldRules
    }

  }, {})

  return Object.keys(rules).length === 0 ? null : rules

}

const transformValues = async (req, fields, values) => {

  const fieldMap = fields.reduce((fieldMap, field) => ({
    ...fieldMap,
    [field.get('code')]: field
  }), {})

  return await Promise.reduce(Object.keys(values), async (transformed, key) => {
    const transformedValue = await transformValue(req, fieldMap[key], values[key])
    return {
      ...transformed,
      [key]: _.castArray(transformedValue).filter(item => !_.isNil(item))
    }
  }, {})

}

const transformValue = async (req, field, value) => {

  if(_.isNil(value)) return null

  if(field.get('type') === 'addressfield') {
    const required = ['street_1','city','state_province']
    const valid = required.reduce((valid, field) => {
      if(!valid) return false
      return value[field] !== undefined && value[field].length > 0
    }, true)
    if(!valid) return null
    return {
      ...value,
      ...await geocode(value)
    }
  }

  if(_.includes(['numberfield','moneyfield'], field.get('type'))) {
    return parseFloat(value)
  }

  return value

}

export default processValues
