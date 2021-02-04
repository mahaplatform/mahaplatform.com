import RecordingField from '../recordingfield'
import { Form, UserToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Recipientsfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onDone: PropTypes.func
  }

  state = {
    config: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: this._getDefault()
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'say',
      voice: 'woman',
      destination: 'dial',
      client: ['maha','cell']
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Extension',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: 'Add',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Extension', type: 'segment', fields: [
              { name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name', defaultValue: config.name },
              { name: 'extension', type: 'numberfield', required: true, placeholder: 'Enter a 3 digit extension', maxLength: 3, defaultValue: config.extension },
              { name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', filter: { is_active: { $eq: true } }, value: 'id', text: 'full_name', format: UserToken, defaultValue: config.user_id }
            ] },
            { label: 'Announcement', type: 'segment', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'say', text: 'Speak text' },
                { value: 'play', text: 'Play recording' }
              ], defaultValue: config.strategy },
              ...this._getStrategy()
            ] }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    if(config.strategy === 'say') {
      return [
        { name: 'voice', type: 'dropdown', options: [
          { value: 'woman', text: 'Female Voice' },
          { value: 'man', text: 'Male Voice' }
        ], required: true, defaultValue: config.voice },
        { name: 'message', type: 'textarea', placeholder: 'For {username}, dial {extension}', required: true, defaultValue: config.message }
      ]
    } else if(config.strategy === 'play') {
      return [
        { label: 'Recording', name: 'recording_id', type: RecordingField, required: true, defaultValue: config.recording_id }
      ]
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    this.props.onDone(config)
    this.context.form.pop()
  }

}

export default Recipientsfield
