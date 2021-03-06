import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class CheckboxForm extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  form = null

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)


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
      title: 'Checkbox',
      reference: node => this.form = node,
      onChange: this._handleChange,
      onSubmit: this._handleDone,
      cancelText: null,
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true, defaultValue: config.name },
            { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: config.label },
            { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions', defaultValue: config.instructions },
            { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required', defaultValue: config.required },
            { label: 'Prompt', name: 'prompt', type: 'htmlfield', placeholder: 'Enter a prompt', defaultValue: config.prompt }
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
      required: false,
      prompt: 'Confirm me'
    }
  }

  _handleChange(config) {
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

  _handleSubmit() {
    this.form.submit()
  }

}

export default CheckboxForm
