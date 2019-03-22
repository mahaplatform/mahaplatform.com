import { createSelector } from 'reselect'
import _ from 'lodash'

const items = (state, props) => state.maha.admin.devices

const presence = (state, props) => state.maha.presence.presence

export const devices = createSelector(
  items,
  presence,
  (devices, presences) => devices.map(device => {
    const presence = _.find(presences, { device_id: device.id })
    return {
      ...device,
      last_active_at: presence && presence.last_active_at ? presence.last_active_at : device.last_active_at,
      status: presence ? presence.status : 'offline'
    }
  })
)
