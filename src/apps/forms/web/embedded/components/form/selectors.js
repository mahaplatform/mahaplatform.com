import { createSelector } from 'reselect'
import _ from 'lodash'

const config = (state, props) => props.config

const rawdata = (state, props) => state.data

const errors = (state, props) => state.errors

const ready = (state, props) => state.ready

const status = (state, props) => state.status

const validated = (state, props) => state.validated

export const data = createSelector(
  config,
  rawdata,
  (config, rawdata) => Object.keys(rawdata).reduce((data, code) => {
    const field = config.fields.find(field => {
      return field.code === code
    })
    if(!field || field.type !== 'paymentfield') return data
    return {
      ...data,
      [code]: {
        line_items: rawdata[code].line_items.map(line_item => ({
          ...line_item,
          description: config.fields.filter(field => {
            return !_.includes(['text','paymentfield','productfield'], field.type)
          }).reduce((description, field) => {
            return description.replace(`<%- response.${field.name.token} %>`, getData(field, data[field.code]))
          }, line_item.description)
        }))
      }
    }
  }, rawdata)
)

export const fields = createSelector(
  config,
  data,
  (config, data) => config.fields.filter(field => {
    if(!config.rules) return true
    const rule = config.rules.rules.find(rule => {
      return rule.then_code === field.code
    })
    if(!rule) return true
    const if_field = config.fields.find(field => {
      return field.code === rule.if_code
    })
    const if_value = data[rule.if_code]
    const value = if_value ? (if_field.type === 'optionsfield' ? if_value.line_items[0].code : if_value) : null
    const show = rule.action === 'show'
    if(!value) {
      return rule.comparison === '$nl' ? show : !show
    } else if(rule.comparison === '$nnl') {
      return value !== null ? show : !show
    } else if(rule.comparison === '$eq') {
      return value === rule.value ? show : !show
    } else if(rule.comparison === '$neq') {
      return value !== rule.value ? show : !show
    } else if(rule.comparison === '$ct') {
      return value.search(rule.value) > -1 ? show : !show
    } else if(rule.comparison === '$nct') {
      return value.search(rule.value) < 0 ? show : !show
    } else if(rule.comparison === '$in') {
      return _.includes(rule.value, value) ? show : !show
    } else if(rule.comparison === '$nin') {
      return !_.includes(rule.value, value) ? show : !show
    } else if(rule.comparison === '$int') {
      return _.intersection(rule.value, value).length > 0 ? show : !show
    } else if(rule.comparison === '$nint') {
      return _.intersection(rule.value, value).length === 0 ? show : !show
    }
  })
)

const submittable = createSelector(
  fields,
  (fields) => fields.filter(field => {
    return !_.includes(['text'], field.type)
  })
)

export const requiresPayment = createSelector(
  submittable,
  (fields) => fields.find(field => {
    return _.includes(['optionsfield','paymentfield','productfield'], field.type)
  }) !== undefined
)

export const isActive = createSelector(
  status,
  (status) => _.includes(['ready','validating','submitting','failure'], status)
)

export const isReady = createSelector(
  submittable,
  ready,
  (fields, ready) => fields.find(field => {
    return !_.includes(ready, field.code)
  }) === undefined
)

export const isValid = createSelector(
  submittable,
  validated,
  errors,
  (fields, validated, errors) => Object.keys(errors).length === 0 && fields.find(field => {
    return !_.includes(validated, field.code)
  }) === undefined
)

const line_items = createSelector(
  submittable,
  data,
  (fields, data) => {
    const paymentfields = fields.filter(field => {
      return _.includes(['optionsfield','paymentfield','productfield'], field.type)
    })
    return paymentfields ? paymentfields.reduce((line_items, field, index) => [
      ...line_items,
      ...data[field.code] ? data[field.code].line_items : []
    ], []) : []
  }
)

export const subtotal = createSelector(
  line_items,
  (line_items) => line_items.reduce((subtotal, line_item) => {
    return subtotal + line_item.total
  }, 0.00))

export const tax = createSelector(
  line_items,
  (line_items) => line_items.reduce((tax, line_item) => {
    return tax + (tax ? line_item.total * line_item.tax : 0)
  }, 0.00))

export const total = createSelector(
  subtotal,
  tax,
  (subtotal, tax) => subtotal + tax)

const getData = (field, value) => {
  const type = field.type === 'contactfield' ? field.contactfield.type : field.type
  if(type === 'addressfield') return value ? value.description : null
  return value
}

const filtered = createSelector(
  data,
  line_items,
  (data, line_items) => line_items.filter(line_item => {
    return line_item.quantity > 0
  }).map(line_item => ({
    code: line_item.code,
    project_id: line_item.project_id,
    revenue_type_id: line_item.revenue_type_id,
    description:line_item.description,
    quantity: line_item.quantity,
    tax_rate: line_item.tax_rate,
    is_tax_deductible: line_item.is_tax_deductible,
    price: line_item.price,
    total: line_item.total
  })))

export const summary = createSelector(
  filtered,
  subtotal,
  tax,
  total,
  (line_items, subtotal, tax, total) => ({
    line_items,
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2)
  }))
