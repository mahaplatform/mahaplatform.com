import { Button, Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import OptOut from '../optout'
import OptIn from '../optin'
import moment from 'moment'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    channels: PropTypes.array,
    program: PropTypes.object
  }

  state = {
    active: null,
    expanded: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { active, expanded } = this.state
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
              <table className="ui unstackable compact table">
                <tbody>
                  { channels.map((channel, index) => [
                    <tr key={`channel_${index}`} className="crm-contact-channels-channel" onClick={ this._handleChannel.bind(this, index) }>
                      <td>
                        { active === index ?
                          <i className="fa fa-fw fa-chevron-down" /> :
                          <i className="fa fa-fw fa-chevron-right" />
                        }
                        { channel.label }
                      </td>
                      <td className="collapsing">
                        { channel.type.toUpperCase() }
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
                            <div>Opted In</div> :
                            <div>Opted Out</div>
                          }
                        </td>
                      }
                    </tr>,
                    ...active === index ? [(
                      <tr key={`channel_${index}_details`} className="crm-contact-channels-channel-details">
                        <td colSpan="3">
                          { channel.optedin_at &&
                            <div>
                              Opted In: { moment(channel.optedin_at).format('MMM, DD YYYY [@] hh:mm A') }
                            </div>
                          }
                          { channel.optedout_at &&
                            <div>
                              Opted Out: { moment(channel.optedout_at).format('MMM, DD YYYY [@] hh:mm A') }
                            </div>
                          }
                          { channel.optin_reason &&
                            <div>
                              Opt In Reason: { channel.optin_reason }
                            </div>
                          }
                          { channel.optout_reason &&
                            <div>
                              Opt Out Reason: { channel.optout_reason }
                            </div>
                          }
                          { channel.optout_reason_other &&
                            <div>
                              Other: { channel.optout_reason_other }
                            </div>
                          }
                          { channel.code &&
                            <Button {...this._getPreferencesButton(channel) } />
                          }
                        </td>
                      </tr>
                    )] : []
                  ])}
                </tbody>
              </table>
            </div>
          </div>
        }
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

  _getPreferencesButton(channel) {
    return {
      label: 'Update Preferences',
      className: 'link',
      link: `/crm/preferences/${channel.code}`
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

  _handleChannel(id) {
    this.setState({
      active: this.state.active === id ? null : id
    })
  }

}

export default Program
