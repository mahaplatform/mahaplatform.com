import { getNext } from '../utils'
import moment from 'moment'

const getDuration = (step) => {
  const duration_days = parseInt(step.duration_days || 0)
  const duration_hours = parseInt(step.duration_hours || 0)
  const duration_mins = parseInt(step.duration_mins || 0)
  return moment().add(duration_days, 'd').add(duration_hours, 'h').add(duration_mins, 'm')
}

const getDatetime = ({ until_date, until_time }) => {
  return moment(`${until_date} ${until_time}`)
}

const waitStep = async (req, { config, state, step }) => {

  const until = step.config.strategy === 'duration' ? getDuration(step) : getDatetime(step)

  return {
    action: {
      waited_until: until,
      data: { until }
    },
    next: getNext(req, { config, state })
  }
}

export default waitStep
