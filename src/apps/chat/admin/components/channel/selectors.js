import { createSelector } from 'reselect'
import moment from 'moment'
import _ from 'lodash'

const quoted_message_id = (state, props) => state.quoted_message_id

export const  unsorted = (state, props) => state.messages

export const messages = createSelector(
  unsorted,
  (unsorted) => {
    return unsorted.slice().reverse().reduce((messages, message) => {
      const day = moment(message.created_at).format('YYYYMMDD')
      const delta = moment(message.created_at).diff(messages.last_message_at, 'minutes')
      const newuser = message.user.id !== _.get(messages, `${day}.last_user_id`)
      return {
        ...messages,
        [day]: {
          ...messages[day] || {},
          date: message.created_at,
          last_user_id: message.user.id,
          last_message_at: message.created_at,
          messages: [
            ..._.get(messages, `${day}.messages`) || [],
            {
              ...message,
              full: newuser || delta > 5
            }
          ]
        }
      }
    }, {})
  })

export const quoted_message = createSelector(
  unsorted,
  quoted_message_id,
  (messages, id) => _.find(messages, { id })
)
