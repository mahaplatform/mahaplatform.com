import pluralize from 'pluralize'
import moment from 'moment'

const Token = (wait) => {
  if(wait.strategy === 'duration') {
    const { duration_days, duration_hours, duration_mins } = wait
    const duration = []
    if(duration_days) duration.push(pluralize('day', duration_days, true))
    if(duration_hours) duration.push(pluralize('hour', duration_hours, true))
    if(duration_mins) duration.push(pluralize('min', duration_mins, true))
    return `for ${duration.join(', ')}`
  } else if(wait.strategy === 'datetime') {
    return `until ${moment(`${wait.until_date} ${wait.until_time}`).format('MM/DD/YY [@] hh:mm A')}`
  }
}

export default Token
