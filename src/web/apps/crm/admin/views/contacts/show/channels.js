import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import OptOut from './optout'
import OptIn from './optin'
import React from 'react'

class Channels extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    consent: PropTypes.array,
    contact: PropTypes.object
  }

  render() {
    const { consent } = this.props
    return (
      <div className="crm-contact-consent">
        <table className="ui unstackable compact table">
          <tbody>
            { consent.map((program, i) => [
              <tr key={`program_${i}`} className="crm-contact-consent-program" >
                <td colSpan="2">
                  <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
                  { program.title }
                </td>
              </tr>,
              ...program.channels.map((channel, j) => (
                <tr key={`channel_${j}`} className="crm-contact-consent-channel">
                  <td>
                    { channel.label }
                  </td>
                  <td className="collapsing">
                    { channel.has_consented ?
                      <div className="ui mini red button" onClick={ this._handleOptOut.bind(this, channel, program) }>Opt Out</div> :
                      <div className="ui mini blue button" onClick={ this._handleOptIn.bind(this, channel, program) }>Opt In</div>
                    }
                  </td>
                </tr>
              ))
            ]) }
          </tbody>
        </table>
      </div>
    )
  }

  _getConsent(channel, program) {
    const { contact } = this.props
    return {
      contact,
      channel,
      program
    }
  }

  _handleOptIn(channel, program) {
    this.context.modal.open(<OptIn { ...this._getConsent(channel, program) } />)
  }

  _handleOptOut(channel, program) {
    this.context.modal.open(<OptOut { ...this._getConsent(channel, program) } />)
  }

}

export default Channels
