const { url } = require('./utils')
const moment = require('moment')
const _ = require('lodash')

const timeofday = (req, twiml) => {
  const { query, step } = req
  const { state } = query
  const now = moment()
  const dayofweek = parseInt(now.format('e'))
  const today = now.format('YYYY-MM-DD')
  const index = step.timeblocks.findIndex(timeblock => {
    const time = timeblock.times.find(time => {
      const start_time = moment(`${today} ${time.start_time}`, 'YYYY-MM-DD H:mm')
      const end_time = moment(`${today} ${time.end_time}`, 'YYYY-MM-DD H:mm')
      return now.isBetween(start_time, end_time)
    })
    if(!time) return false
    return _.includes(timeblock.days, dayofweek)
  })
  if(index >= 0) {
    twiml.redirect(url(req, '/voice', { state: `${state}.timeblocks.${index}.steps.0` }))
  } else  {
    twiml.redirect(url(req, '/voice', { state: `${state}.else.steps.0` }))
  }
}

module.exports = timeofday
