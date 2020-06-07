import Program from '../programs/program'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Settings extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    onPop: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program } = this.props
    return {
      title: 'Settings',
      method: 'patch',
      action: '/api/admin/crm',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      before: <Program program={ program } />,
      sections: [
        {
          instructions: `
            Adjust the settings below for all calls made to and from this
            program's phone number
          `,
          fields: [
            { label: 'Hold Music', name: 'title', type: 'radio', required: true },
            { label: 'Ring Sound', name: 'title', type: 'textfield', required: true }
          ]
        }
      ]
    }
  }

  ringtone = null

  componentDidMount() {
    this.ringtone = new Audio(`${process.env.WEB_HOST}/admin/audio/overture.mp3`)
    this.ringtone.loop = true
    this.ringtone.play()
  }

  componentWillUnmount() {
    this.ringtone.pause()
    this.ringtone.currentTime = 0
  }


  _handleBack() {
    this.props.onPop()
  }

  _handleSuccess() {
    this.props.onPop()
  }

}

export default Settings
