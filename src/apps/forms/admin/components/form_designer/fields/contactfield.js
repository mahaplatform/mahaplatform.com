import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class ContactFieldForm extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
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
    return {
      title: 'Contact Field',
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
          fields: this._getContactFields()
        }
      ]
    }
  }

  _getContactFields() {
    const { config } = this.state
    const { type } = config.contactfield
    const fields = [
      { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true, defaultValue: config.name  },
      { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: config.label },
      { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions', defaultValue: config.instructions },
      { label: 'Placeholder', name: 'placeholder', type: 'textfield', placeholder: 'Enter placeholder text', defaultValue: config.placeholder },
      { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required', defaultValue: config.required }
    ]
    if(type === 'checkbox') {
      fields.push({ label: 'Prompt', name: 'prompt', type: 'htmlfield', placeholder: 'Enter prompt text', defaultValue: config.prompt || prompt })
    }
    return fields
  }

  _getDefault() {
    return {
      name: null,
      label: null,
      instructions: '',
      required: false,
      contactfield: null,
      overwrite: true
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

export default ContactFieldForm
