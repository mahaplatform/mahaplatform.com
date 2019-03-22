import { createSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'

const unfiltered = (state, props) => props.records || []

const stars = (state, props) => state.maha.stars.stars

export const records = createSelector(
  unfiltered,
  stars,
  (records, stars) => records.filter(record => {
    return _.get(stars, `chat_messages[${record.id}]`) !== false
  })
)

export const sorted = createSelector(
  records,
  (records) => records.reduce((messages, message) => {
    const newday = moment(message.created_at).format('D') !== moment(messages.created_at).format('D')
    return {
      user_id: message.user.id,
      created_at: message.created_at,
      messages: [
        ...messages.messages,
        {
          ...message,
          newday
        }
      ]
    }
  }, { messages: [], user_id: null, created_at: null }).messages
)

export const all = createSelector(
  records,
  (records) => records.length
)

export const total = createSelector(
  records,
  (records) => records.length
)
