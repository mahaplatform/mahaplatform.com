import moment from 'moment'

const getDuration = ({ duration_days, duration_hours, duration_mins }) => {
  return moment().add(duration_days || 0, 'days').add(duration_hours || 0, 'hours').add(duration_mins || 0, 'mins')
}

const getDatetime = ({ until_date, until_time }) => {
  return moment(`${until_date} ${until_time}`)
}

const wait = async (req, { config }) => ({
  until: (config.strategy === 'duration') ? getDuration(config) : getDatetime(config)
})

export default wait
