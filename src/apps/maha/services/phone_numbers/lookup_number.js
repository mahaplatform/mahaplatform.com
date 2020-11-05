import twilio from '@core/services/twilio'
import _ from 'lodash'

const capitalize = (parts) => parts.map(part => {
  return _.capitalize(part)
}).join(' ')

const lookupNumber = async (req, { number }) => {

  const lookup = await twilio.lookups.phoneNumbers(number).fetch({
    type: 'caller-name'
  })

  if(!lookup.callerName) return {}

  const { caller_name, caller_type } = lookup.callerName

  if(caller_type !== 'CONSUMER') return {}

  const parts = caller_name.replace(/\s+/g, ',').toLowerCase().split(',')

  return {
    first_name: capitalize(parts.slice(0, 1)),
    last_name: capitalize(parts.slice(1))
  }

}

export default lookupNumber
