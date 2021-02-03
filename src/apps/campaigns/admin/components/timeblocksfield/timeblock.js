import TimesField from '../timesfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class TimeBlock extends React.PureComponent {

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
      voice: 'woman'
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Recipient',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: 'Add',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name', defaultValue: config.name },
            { label: 'Days', name: 'days', type: 'checkboxes', options: [
              { value: 0, text: 'Sunday' },
              { value: 1, text: 'Monday' },
              { value: 2, text: 'Tuesday' },
              { value: 3, text: 'Wednesday' },
              { value: 4, text: 'Thursday' },
              { value: 5, text: 'Friday' },
              { value: 6, text: 'Saturday' }
            ], defaultValue: config.days },
            { label: 'Times', name: 'times', type: TimesField, required: true }
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

export default TimeBlock
