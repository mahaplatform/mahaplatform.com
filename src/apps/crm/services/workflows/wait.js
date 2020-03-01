import moment from 'moment'

const getDuration = (params) => {
  const { duration_days, duration_hours, duration_mins } = params
  return moment().add(duration_days || 0, 'days').add(duration_hours || 0, 'hours').add(duration_mins || 0, 'mins')
}

const getDatetime = (params) => {
  const { until_date, until_time } = params
  return moment(`${until_date} ${until_time}`)
}

export const wait = async (req, params) => ({
  until: (params.strategy === 'duration') ? getDuration(params) : getDatetime(params)
})
