import Response from '../../../../models/response'
import Form from '../../../../models/form'
import _ from 'lodash'

const getValue = (field, data) => {
  const type = _.get(field, 'contactfield.type') || field.type
  if(type === 'addressfield') {
    return {
      [`${field.name.value} (Street 1)`]: data.street_1,
      [`${field.name.value} (Street 2)`]: data.street_2,
      [`${field.name.value} (City)`]: data.city,
      [`${field.name.value} (State/Province)`]: data.state_province,
      [`${field.name.value} (Postal Code)`]: data.postal_code
    }
  }
  if(type === 'checkboxes') {
    return field.options.reduce((items, option) => ({
      ...items,
      [`${field.name.value} (${option.text})`]: _.includes(data, option.value) ? 'true' : 'false'
    }), {})
  }
  if(type === 'checkbox') {
    return {
      [field.name.value]: data ? 'true' : 'false'
    }
  }
  if(type === 'productfield') {
    return {
      ...field.products.reduce((items, product) => {
        const p = _.find(data.products, { product_id: product.id })
        return {
          ...items,
          [`${field.name.value} (${product.title})`]: p ? p.quantity : 0
        }
      }, {}),
      [`${field.name.value} (Tax)`]: data.tax,
      [`${field.name.value} (Total)`]: data.total
    }
  }
  return {
    [field.name.value]: data
  }
}

const downloadRoute = async (req, res) => {

  const form = await Form.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.form_id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const responses = await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', form.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  const { fields } = form.get('config')

  res.status(200).respond(responses, (req, response) => ({
    ...fields.filter(field => {
      return field.type !== 'text'
    }).reduce((row, field) => ({
      ...row,
      ...getValue(field, response.get('data')[field.code])
    }), {}),
    ...response.get('data').payment ? {
      'Payment (Method)': response.get('data').payment.method,
      'Payment (Reference)': response.get('data').payment.reference,
      'Payment (Ammount)': response.get('data').payment.amount
    } : {}
  }))

}

export default downloadRoute
