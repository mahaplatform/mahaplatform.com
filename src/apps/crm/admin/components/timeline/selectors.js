import { createSelector } from 'reselect'
import moment from 'moment'

const activities = (state, props) => state.activities || []

export const months = createSelector(
  activities,
  (activities) => Object.values(activities.reduce((months, activity) => {
    const month = moment(activity.created_at).format('YYYYMM')
    return {
      ...months,
      [month]: {
        date: activity.created_at,
        activities: [
          ...months[month] ? months[month].activities : [],
          activity
        ]
      }
    }
  }, {})).sort((a,b) => {
    return a.date < b.date ? 1 : -1
  })
)
