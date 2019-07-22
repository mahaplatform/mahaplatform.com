import { UserToken, PresenceToken, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const SessionToken = ({ user }) => (
  <UserToken { ...user } presence={ false } />
)

SessionToken.propTypes = {
  user: PropTypes.object
}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Sessions',
  rights: ['team:manage_people'],
  collection: {
    endpoint: '/api/admin/team/sessions',
    table: [
      { label: 'User', key: 'user', format: SessionToken, primary: true },
      { label: 'Device', key: 'device.device_type', sort: 'device_types.text' },
      { label: 'OS', key: 'device.os_name', sort: 'os_names.text' },
      { label: 'Browser', key: 'device.browser_name', sort: 'browser_names.text' },
      { label: 'Push', key: 'device.is_push_enabled', format: 'check' },
      { label: 'Last Active', key: 'last_online_at', format: PresenceToken, primary: true }
    ],
    filters: [
      { label: 'Device Type', name: 'maha_devices.device_type_id', type: 'select', endpoint: '/api/admin/team/device_values/device_types', value: 'id', text: 'text', sort: { key: 'text', order: 'asc' } },
      { label: 'OS', name: 'maha_devices.os_name_id', type: 'select', endpoint: '/api/admin/team/device_values/os_names', value: 'id', text: 'text', sort: { key: 'text', order: 'asc' } },
      { label: 'Browser', name: 'maha_devices.browser_name_id', type: 'select', endpoint: '/api/admin/team/device_values/browser_names', value: 'id', text: 'text', sort: { key: 'text', order: 'asc' } },
      { label: 'User', name: 'user_id', type: 'select', endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken }
    ],
    defaultSort: { key: 'last_active_at', order: 'desc' }
  }

})

export default Page(null, mapPropsToPage)
