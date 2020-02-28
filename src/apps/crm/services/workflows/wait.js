import executeWorkflowQueue from '../../queues/execute_workflow_queue'
import moment from 'moment'

const getDuration = (params) => {
  const { duration_days, duration_hours, duration_mins } = params
  return moment().add(duration_days || 0, 'days').add(duration_hours || 0, 'hours').add(duration_mins || 0, 'mins')
}

const getDatetime = (params) => {
  const { until_date, until_time } = params
  return moment(`${until_date} ${until_time}`)
}

const getUntil = (params) => {
  const { strategy } = params
  if(strategy === 'duration') {
    return getDuration(params)
  } else if(strategy === 'datetime') {
    return getDatetime(params)
  }
}

export const wait = async (req, params) => {

  const { enrollment } = params

  const until = getUntil(params)

  await executeWorkflowQueue(req, {
    enrollment_id: enrollment.get('id')
  }, {
    until
  })

}
