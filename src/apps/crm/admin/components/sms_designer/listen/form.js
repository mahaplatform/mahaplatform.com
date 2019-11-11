import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Listen extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Listen',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Variable', name: 'variable', type: 'textfield', defaultValue: config.variable }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    this.props.onChange(config)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Listen
