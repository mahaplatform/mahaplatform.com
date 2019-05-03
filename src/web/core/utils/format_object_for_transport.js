import moment from 'moment'
import _ from 'lodash'

const formatObjectForTransport = (value) => {

  if(_.isUndefined(value)) return null

  if(_.isDate(value)) return moment(value).utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'

  if(_.isPlainObject(value)) return Object.keys(value).reduce((formatted, key) => ({
    ...formatted,
    [key]: formatObjectForTransport(value[key])
  }), {})

  return value

}

export default formatObjectForTransport
