import RecipientsField from '../recipientsfield'
import RecordingField from '../recordingfield'
import { Container, Form } from '@admin'
import SpeakField from '../speakfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Extension extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    extension: PropTypes.object,
    mode: PropTypes.string,
    users: PropTypes.array,
    onDone: PropTypes.func
  }

  static defaultProps = {
    extension: {}
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
    const { extension } = this.props
    this.setState({
      config: {
        ...this._getDefault(),
        ...extension
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'say',
      say: {
        voice: 'Salli',
        text: ''
      },
      recipients: []
    }
  }

  _getForm() {
    const { mode, users } = this.props
    const { config } = this.state
    return {
      title: 'Extension',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: mode === 'new' ? 'Add' : 'Update',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Extension', type: 'segment', fields: [
              { name: 'extension', type: 'numberfield', required: true, placeholder: 'Enter a 3 digit extension', maxLength: 3, defaultValue: config.extension },
              { name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name', defaultValue: config.name }
            ] },
            { label: 'Announcement', type: 'segment', instructions: 'Play this announcement before dialing out to recipient(s)', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'say', text: 'Speak text' },
                { value: 'play', text: 'Play an audio file' },
                { value: 'none', text: 'No announcement' }
              ], defaultValue: config.strategy },
              ...this._getStrategy()
            ] },
            { label: 'Recipients', name: 'recipients', type: RecipientsField, users, instructions: `
              Add one or more recipients. When an incoming call is routed to this
              extension, all phones will ring simultaneously and the call will
              be fowarded to the first one that answers
            `, required: true, defaultValue: config.recipients }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    if(config.strategy === 'say') {
      return [
        { name: 'say', type: SpeakField, placeholder: 'Connecting you to...', required: true, defaultValue: config.say }
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


const mapResources = (props, context) => ({
  users: {
    endpoint: '/api/admin/users',
    filter: {
      is_active: {
        $eq: true
      }
    }
  }
})

export default Container(mapResources)(Extension)
