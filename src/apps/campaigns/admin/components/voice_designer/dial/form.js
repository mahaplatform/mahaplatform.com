import RecipientsField from '../../recipientsfield'
import RecordingField from '../../recordingfield'
import SpeakField from '../../speakfield'
import { Container, Form } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Dial extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    users: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  form = null

  state = {
    config: null
  }

  _handleCancel = this._handleCancel.bind(this)
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
        ...this.props.config || {}
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'say',
      voice: 'woman',
      recipients: []
    }
  }

  _getForm() {
    const { config } = this.state
    const { users } = this.props
    return {
      reference: node => this.form = node,
      title: 'Forward Call',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', defaultValue: config.code },
            { label: 'Step Name', name: 'name', type: 'textfield', placeholder: 'Enter a name for this step', required: true, defaultValue: config.name },
            { label: 'Announcement', type: 'segment', instructions: 'Play this announcement before dialing out to recipient(s)', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'say', text: 'Speak text' },
                { value: 'play', text: 'Play an audio file' },
                { value: 'none', text: 'No announcement' }
              ], defaultValue: config.strategy },
              ...this._getStrategy()
            ] },
            { label: 'Recipients', name: 'recipients', type: RecipientsField, users, instructions: `
              Add as many recipients as you like. When an incoming call arrives,
              all phones will ring and the call will be transfered to the first
              phone that answers
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

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    this.props.onDone(config)
  }

  _handleSubmit() {
    this.form.submit()
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

export default Container(mapResources)(Dial)
