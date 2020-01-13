import { Form, ImportStrategyToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Configure extends React.PureComponent {

  static propTypes = {
    params: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Configure Import',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleCancel,
      onSubmit: this._handleSubmit,
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

  _handleCancel() {
    this.props.onBack()
  }

  _handleSubmit(result) {
    const { params } = this.props
    this.props.onDone({
      ...params,
      ...result
    })
  }

}

export default Configure
