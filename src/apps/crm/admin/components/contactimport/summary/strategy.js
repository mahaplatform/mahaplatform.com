import { Form, ImportStrategyToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Strategy extends React.PureComponent {

  static propTypes = {
    _import: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { _import } = this.props
    return {
      title: 'Choose Strategy',
      action: `/api/admin/imports/${_import.id}`,
      method: 'patch',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'How should we handle duplicate records?', name: 'strategy', type: 'radiogroup', options: ['ignore','overwrite','discard'], format: ImportStrategyToken, defaultValue: _import.strategy }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleSuccess() {
    this.props.onDone()
  }

}

export default Strategy
