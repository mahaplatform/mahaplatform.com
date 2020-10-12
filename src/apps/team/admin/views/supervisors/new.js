import { Chooser, UserToken } from 'maha-admin'
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
      endpoint: '/api/admin/team/supervisors/available',
      multiple: false,
      name: 'user_id',
      value: 'id',
      text: 'full_name',
      format: UserToken,
      title: 'Choose Supervisor',
      onDone: this._handleDone
    }
  }

  _handleDone(supervisor) {
    this.context.router.history.push(`/team/supervisors/${supervisor.id}`)
  }

}

export default New
