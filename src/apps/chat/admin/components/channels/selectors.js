
import { createSelector } from 'reselect'

const unsorted = (state, props) => props.channels

const channel_type = (state, props) => state.channel_type

export const channels = createSelector(
  unsorted,
  channel_type,
  (channels, channel_type) => channels.filter(channel => {
    if(channel_type === 'starred') return channel.is_starred === true
    return channel.is_archived === (channel_type === 'archived')
  })
)
