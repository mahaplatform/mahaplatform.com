import Contact from '../../../models/contact'
import _ from 'lodash'

const getResponseData = async (req, { response }) => {

  await response.load(['form'])

  const form = response.related('form')

  const fields = form.get('config').fields.filter(field => {
    return field.type !== 'text'
  })

  const data = response.get('data')

  return {
    ...fields.reduce((response, field) => ({
      ...response,
      [field.name.token]: data[field.code]
    }), {}),
    payment: data.payment
  }

}

const getContactData = async (req, { enrollment }) => {

  const contact = await Contact.query(qb => {
    qb.select(req.trx.raw('crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.id', enrollment.get('contact_id'))
  }).fetch({
    transacting: req.trx
  })

  return {
    first_name: contact.get('first_name'),
    last_name: contact.get('last_name'),
    email: contact.get('email')
  }

}

const evaluate = async (left, comparison, right) => {
  if(right === 'else') return true
  if(comparison === '$eq') {
    return left === right
  }
}

export const conditional = async (req, params) => {

  const { enrollment, response, step } = params

  const data = {
    contact: await getContactData(req, { enrollment }),
    response: response.get('data')
  }

  const { comparison, token } = step.get('config')

  const value = _.get(data, token)

  const option = step.get('config').options.find(option => {
    return evaluate(value, comparison, option.value)
  })

  return {
    condition: {
      parent: step.get('code'),
      answer: option.code,
      delta: -1
    }
  }

}
