import { Container, Dependencies } from '@admin'
import PropTypes from 'prop-types'
import PhoneRoot from './phone'
import React from 'react'

class PhoneRootContainer extends React.Component {

  static propTypes = {
    token: PropTypes.string
  }

  render() {
    return <PhoneRoot { ...this._getPhoneRoot() } />
  }

  _getPhoneRoot() {
    const { token } = this.props
    return {
      token
    }
  }

}

const mapResources = (props, context) => ({
  token: '/api/admin/phone/calls/token'
})

const dependencies = {
  scripts: [
    { url: `${process.env.WEB_ASSET_CDN_HOST}/js/twilio.min.js`, check: 'Twilio.Device' }
  ]
}

PhoneRootContainer = Container(mapResources)(PhoneRootContainer)

PhoneRootContainer = Dependencies(dependencies)(PhoneRootContainer)

export default PhoneRootContainer
