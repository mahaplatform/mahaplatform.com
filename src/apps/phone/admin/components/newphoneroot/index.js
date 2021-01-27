import { Container, Dependencies } from '@admin'
import PropTypes from 'prop-types'
import PhoneRoot from './phone'
import moment from 'moment'
import React from 'react'

class PhoneRootContainer extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    token: PropTypes.string
  }

  state = {
    program_id: null
  }

  _handleClose = this._handleClose.bind(this)
  _handleProgram = this._handleProgram.bind(this)

  render() {
    return (
      <PhoneRoot { ...this._getPhoneRoot() } />
    )
  }

  componentDidMount() {
    const { programs } = this.props
    this._handleProgram(programs[0].id)
  }

  _getPhoneRoot() {
    const { programs, token } = this.props
    return {
      programs,
      program: this._getProgram(),
      token,
      onClose: this._handleClose,
      onProgram: this._handleProgram
    }
  }

  _getProgram() {
    const { program_id } = this.state
    const { programs } = this.props
    return programs.find(program => {
      return program.id === program_id
    })
  }

  _handleClose() {
    this.context.modal.close()
  }

  _handleProgram(program_id) {
    this.setState({ program_id })
  }

}

const mapResources = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      phone_number_id: { $nnl: true },
      access_type: { $in: ['manage','edit'] }
    }
  },
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
