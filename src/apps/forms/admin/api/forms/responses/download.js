import Response from '../../../../models/response'
import Form from '../../../../models/form'
import numeral from 'numeral'
import _ from 'lodash'

const getValue = (field, data) => {
  if(_.isNil(data)) {
    return {
      [field.name.value]: null
    }
  }
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
        const p = _.find(data.line_items, { code: product.code })
        return {
          ...items,
          [`${field.name.value} (${product.description})`]: p ? p.quantity : 0
        }
      }, {})
    }
  }
  if(type === 'paymentfield') {
    return {
      [field.name.value]: numeral(data.line_items[0].price).format('0.00')
    }
  }
  return {
    [field.name.value]: data
  }
}

const downloadRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
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
    withRelated: ['payment'],
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
    'Payment (Method)': response.related('payment') ? response.related('payment').get('method') : null,
    'Payment (Reference)': response.related('payment') ? response.related('payment').get('reference') : null,
    'Payment (Amount)': response.related('payment') ? numeral(response.related('payment').get('amount')).format('0.00') : null
  }))

}

export default downloadRoute
