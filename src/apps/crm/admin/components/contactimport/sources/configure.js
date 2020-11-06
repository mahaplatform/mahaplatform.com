import { Form, ImportStrategyToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const instructions = `Your data may include contacts that already exit in
  the CRM. Using the contact's email address, we can detect these
  duplicates and handle them according to your desired duplicate
  strategy. Choose a duplicate strategy from the list below: `

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
    const { params } = this.props
    return {
      title: 'Configure Import',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleCancel,
      onSubmit: this._handleSubmit,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Optional name for this import' },
            { label: 'Duplicate Strategy', instructions, name: 'strategy', type: 'radiogroup', options: ['overwrite','discard'], format: ImportStrategyToken, defaultValue: params.strategy || 'overwrite' }
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
      ...result,
      name: result.name || params.name
    })
  }

}

export default Configure
