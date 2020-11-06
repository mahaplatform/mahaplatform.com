import { Button, Logo } from '@admin'
import PropTypes from 'prop-types'
import OptOut from '../optout'
import OptIn from '../optin'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    channels: PropTypes.array,
    program: PropTypes.object
  }

  state = {
    expanded: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded } = this.state
    const { channels, program } = this.props
    const total = this._getTotal()
    return (
      <div className="crm-contact-properties-program">
        <div className="crm-contact-properties-header" onClick={ this._handleToggle }>
          <div className="crm-contact-properties-header-toggle">
            <i className={`fa fa-fw fa-chevron-${this._getIcon()}`} />
          </div>
          <div className="crm-contact-properties-header-logo">
            <Logo team={ program } width="24" />
          </div>
          <div className="crm-contact-properties-header-title">
            { program.title }
          </div>
          { total > 0 &&
            <div className="crm-contact-properties-header-total">
              <div className="crm-contact-properties-header-total-count">
                { total }
              </div>
            </div>
          }
        </div>
        { expanded &&
          <div className="crm-contact-properties-body">
            <div className="crm-contact-channels">
              <table className="ui compact unstackable table">
                <tbody>
                  { channels.map((channel, index) => (
                    <tr key={`channel_${index}`} className="crm-contact-channels-channel" >
                      <td>
                        <i className={`fa fa-fw fa-${this._getChannelIcon(channel) }`} />
                        { channel.type.toUpperCase() } (
                        { channel.label })
                      </td>
                      { program.access_type === 'manage' ?
                        <td className="collapsing">
                          { channel.has_consented ?
                            <Button { ...this._getOptOutButton(channel, program) } /> :
                            <Button { ...this._getOptInButton(channel, program) } />
                          }
                        </td> :
                        <td className="collapsing">
                          { channel.has_consented ?
                            <span className="alert">Opted In</span> :
                            <span>Opted Out</span>
                          }
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    )
  }

  _getChannelIcon(channel) {
    if(channel.type === 'email') return 'envelope'
    if(channel.type === 'sms') return 'comment'
    if(channel.type === 'voice') return 'phone'
    if(channel.type === 'mail') return 'map-marker'
  }

  _getConsent(channel, program) {
    const { contact } = this.props
    return {
      contact,
      channel,
      program
    }
  }

  _getIcon() {
    const { expanded } = this.state
    return expanded ? 'down' : 'right'
  }

  _getOptInButton(channel, program) {
    return {
      label: 'Opt In',
      className: 'ui mini blue button',
      modal: <OptIn { ...this._getConsent(channel, program) } />
    }
  }

  _getOptOutButton(channel, program) {
    return {
      label: 'Opt Out',
      className: 'ui mini red button',
      modal: <OptOut { ...this._getConsent(channel, program) } />
    }
  }
  _getTotal() {
    const { channels } = this.props
    return channels.filter(channel => {
      return channel.has_consented
    }).length
  }

  _handleToggle() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

}

export default Program
