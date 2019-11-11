import RecordingField from '../recordingfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Play extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Play Recording',
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
            { label: 'Recording', name: 'recording_id', type: RecordingField },
            { label: 'Play', name: 'loop', type: 'lookup', search: false, options: [{ value: 0, text: 'Loop Infinitely' },{ value: 1, text: 'Once' },{ value: 2, text: 'Twice' }], defaultValue: config.loop }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    this.props.onChange(config)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Play
