import Registration from '@apps/events/models/registration'
import Event from '@apps/events/models/event'
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

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.event_id)
  }).fetch({
    withRelated: ['ticket_types'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const registrations = await Registration.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('event_id', event.get('id'))
  }).fetchAll({
    withRelated: ['payment','tickets'],
    transacting: req.trx
  })


  const { fields } = event.get('contact_config')

  await res.status(200).respond(registrations, (req, registration) => {
    const tickets = registration.related('tickets').reduce((tickets, ticket) => ({
      ...tickets,
      [ticket.get('ticket_type_id')]: 1 + (tickets[ticket.get('ticket_type_id')] || 0)
    }), {})
    const payment = registration.related('payment')
    return {
      'First Name': registration.get('data').first_name,
      'Last Name':  registration.get('data').last_name,
      'Email':  registration.get('data').email,
      ...fields.filter(field => {
        return field.type !== 'text'
      }).reduce((row, field) => ({
        ...row,
        ...getValue(field, registration.get('data')[field.code])
      }), {}),
      ...event.related('ticket_types').map(ticket_type => ({
        [ticket_type.get('name')]: tickets[ticket_type.get('id')]
      })),
      'Payment (Method)': payment ? payment.get('method') : null,
      'Payment (Reference)': payment ? payment.get('reference') : null,
      'Payment (Amount)': payment ? payment.get('amount') : null
    }
  })

}

export default downloadRoute
