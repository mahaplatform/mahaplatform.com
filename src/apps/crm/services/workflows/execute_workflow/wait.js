import moment from 'moment'

const getDuration = (config) => {
  const duration_days = parseInt(config.duration_days || 0)
  const duration_hours = parseInt(config.duration_hours || 0)
  const duration_mins = parseInt(config.duration_mins || 0)
  return moment().add(duration_days, 'd').add(duration_hours, 'h').add(duration_mins, 'm')
}

const getDatetime = ({ until_date, until_time }) => {
  return moment(`${until_date} ${until_time}`)
}

const wait = async (req, { config }) => ({
  until: (config.strategy === 'duration') ? getDuration(config) : getDatetime(config)
})

export default wait
