import moment from 'moment'
import _ from 'lodash'

const timeOfDayStep = async (req, { state, config, step }) => {

  const now = moment()

  const dayofweek = parseInt(now.format('e'))

  const today = now.format('YYYY-MM-DD')

  const index = step.timeblocks.findIndex(timeblock => {
    const time = timeblock.times.find(time => {
      const start_time = moment(`${today} ${time.start_time}`, 'YYYY-MM-DD H:mm')
      const end_time = moment(`${today} ${time.end_time}`, 'YYYY-MM-DD H:mm')
      return now.isBetween(start_time, end_time)
    })
    return time ? _.includes(timeblock.days, dayofweek) : false
  })

  return {
    action: {
      data: {
        timeblock: index >= 0 ? step.timeblocks[index].name : 'else'
      }
    },
    next: index >= 0 ? `${state}.timeblocks.${index}.steps.0` : `${state}.else.steps.0`
  }

}

export default timeOfDayStep
