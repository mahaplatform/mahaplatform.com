import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class FileFieldForm extends React.Component {

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
      title: 'File Upload',
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
            { label: 'Prompt', name: 'prompt', type: 'textfield', placeholder: 'Enter prompt text', defaultValue: config.prompt },
            { prompt: 'This field is required', name: 'required', type: 'checkbox', defaultValue: config.required },
            { prompt: 'Allow multiple files?', name: 'multiple', type: 'checkbox', defaultValue: config.multiple }
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
      prompt: 'Upload File(s)',
      required: false,
      multiple: false
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

export default FileFieldForm
