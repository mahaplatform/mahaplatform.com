import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class DateField extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate(config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Date Field',
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
            { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: config.label },
            { label: 'Token', name: 'token', type: 'textfield', disabled: true, defaultValue: config.token },
            { label: 'Instructions', name: 'instructions', type: 'textarea', rows: 2, placeholder: 'Enter instructions', defaultValue: config.instructions },
            { label: 'Placeholder', name: 'placeholder', type: 'textfield', placeholder: 'Enter placeholder text', defaultValue: config.placeholder },
            { label: 'Required', name: 'required', type: 'checkbox', defaultValue: config.required }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      label: '',
      token: '',
      instructions: '',
      placeholder: '',
      required: false
    }
  }

  _handleChange(config) {
    config.token = config.label.replace(/[^A-Za-z0-9\s]+/g, '').replace(/[\s]+/g, '_').toLowerCase()
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default DateField