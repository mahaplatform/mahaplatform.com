import SessionsField from '../sessionsfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Sessions extends React.PureComponent {

  static propTypes = {
    event: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { event } = this.props
    return {
      title: 'Sessions',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'sessions', type: SessionsField, required: true, defaultValue: event.sessions }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange({ sessions }) {
    this.props.onChange({ sessions })
  }

  _handleSuccess({ sessions }) {
    this.props.onDone({ sessions })
  }

}

export default Sessions
