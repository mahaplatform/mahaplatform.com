import { Chooser, CompactUserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return <Chooser { ...this._getChooser() } />
  }

  _getChooser() {
    return {
      action: '/api/admin/team/supervisors',
      method: 'POST',
      endpoint: '/api/admin/users',
      multiple: false,
      name: 'user_id',
      value: 'id',
      text: 'full_name',
      format: CompactUserToken,
      filters: [
        { label: 'Group', name: 'group_id', type: 'select', multiple: true, endpoint: '/api/admin/team/groups', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } }
      ],
      title: 'Choose Supervisor',
      onDone: this._handleDone
    }
  }

  _handleDone(supervisor) {
    this.context.router.push(`/admin/team/supervisors/${supervisor.id}`)
  }

}

export default New
