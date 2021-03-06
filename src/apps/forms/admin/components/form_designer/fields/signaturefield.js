import { Authorized, Form } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class SignatureFieldForm extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  form = null

  state = {
    profile_id: null,
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleProfile = this._handleProfile.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    if(!this.state.config) return null
    return (
      <Authorized { ...this._getAuthorized() }>
        <Form { ...this._getForm() } />
      </Authorized>
    )
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

  _getAuthorized() {
    return {
      label: 'Adobe Sign',
      image: '/images/services/adobesign.png',
      service: 'adobesign',
      type: 'signatures',
      onProfile: this._handleProfile
    }
  }

  _getForm() {
    const { config, profile_id } = this.state
    return {
      title: 'Signature',
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
            { name: 'profile_id', type: 'hidden', value: profile_id },
            { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true, defaultValue: config.name },
            { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: config.label },
            { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions', defaultValue: config.instructions },
            { label: 'Placeholder', name: 'placeholder', type: 'textfield', placeholder: 'Enter placeholder text', defaultValue: config.placeholder },
            { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required', defaultValue: config.required },
            { label: 'Prompt', name: 'prompt', type: 'textfield', placeholder: 'Enter a prompt', defaultValue: config.prompt },
            { label: 'Document', name: 'asset_id', type: 'filefield', required: true,defaultValue: config.asset_id }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      label: '',
      name: {
        token: '',
        value: ''
      },
      instructions: '',
      placeholder: '',
      prompt: 'Sign Document',
      required: false
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

  _handleProfile(profile) {
    this.setState({
      profile_id: profile.id
    })
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default SignatureFieldForm
