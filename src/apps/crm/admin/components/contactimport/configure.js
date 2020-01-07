import { Form, ImportStrategyToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Configure extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    contacts: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Configure Import',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Enter an optional name for this import' },
            { label: 'How should we handle duplicate records?', name: 'strategy', type: 'radiogroup', options: ['ignore','overwrite','discard'], format: ImportStrategyToken, defaultValue: 'ignore' }
          ]
        }
      ]
    }
  }

  _handleSuccess() {

  }

  _handleCancel() {
    this.props.onPop(-2)
  }


}

export default Configure
