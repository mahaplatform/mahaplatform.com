import { Form, UserToken } from '@admin'
import RecordingField from '../recordingfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class User extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object,
    mode: PropTypes.string,
    users: PropTypes.array,
    onDone: PropTypes.func
  }

  static defaultProps = {
    user: {}
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
    const { user } = this.props
    this.setState({
      config: {
        ...this._getDefault(),
        ...user
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'say',
      voice: 'woman'
    }
  }

  _getForm() {
    const { mode } = this.props
    const { config } = this.state
    return {
      title: 'Recipient',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: mode === 'new' ? 'Add' : 'Update',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Announcement', type: 'segment', instructions: 'Play this announcement before dialing out to recipient', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'say', text: 'Speak text' },
                { value: 'play', text: 'Play an audio file' },
                { value: 'none', text: 'No announcement' }
              ], defaultValue: config.strategy },
              ...this._getStrategy()
            ] },
            { label: 'User', type: 'segment', fields: [
              { name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', filter: { is_active: { $eq: true } }, value: 'id', text: 'full_name', format: UserToken, defaultValue: config.user_id }
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
        { name: 'text', type: 'textarea', placeholder: 'Connecting you to...', required: true, defaultValue: config.text }
      ]
    }
    if(config.strategy === 'play') {
      return [
        { name: 'recording_id', type: RecordingField, required: true, defaultValue: config.recording_id }
      ]
    }
    return []
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

export default User
