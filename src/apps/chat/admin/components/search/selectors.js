import { createSelector } from 'reselect'

const records = (state, props) => props.records

export const results = createSelector(
  records,
  (records) => ({
    channels: records.filter(record => {
      return record.type === 'channel'
    }).map(record => record.item),
    messages: records.filter(record => {
      return record.type === 'message'
    }).map(record => record.item)
  }))
