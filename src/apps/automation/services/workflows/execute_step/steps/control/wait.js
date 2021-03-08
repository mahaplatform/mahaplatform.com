import { getNext } from '../utils'
import moment from 'moment'

const getDuration = (config) => {
  const duration_days = parseInt(config.duration_days || 0)
  const duration_hours = parseInt(config.duration_hours || 0)
  const duration_mins = parseInt(config.duration_mins || 0)
  return moment().add(duration_days, 'd').add(duration_hours, 'h').add(duration_mins, 'm')
}

const getDatetime = (config) => {
  const { until_date, until_time } = config
  return moment(`${until_date} ${until_time}`)
}

const waitStep = async (req, { config, state, step }) => {

  const until = step.config.strategy === 'duration' ? getDuration(step.config) : getDatetime(step.config)

  return {
    action: {
      waited_until: until,
      data: { until }
    },
    until,
    next: getNext(req, { config, state })
  }
}

export default waitStep
