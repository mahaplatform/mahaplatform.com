import { parsePhoneNumberFromString } from 'libphonenumber-js'
import ChannelField from './channelfield'

export default ChannelField({
  entity: 'phone number',
  field: { label: 'Phone', name: 'number', type: 'phonefield' },
  format: (item) => {
    const parsed = parsePhoneNumberFromString(item.number, 'US')
    const formatted = parsed.number.match(/^\+1(\d{3})(\d{3})(\d{4})/).slice(1,4).join('-')
    return parsed.ext ? `${formatted} ext. ${parsed.ext}` : formatted
  }
})
