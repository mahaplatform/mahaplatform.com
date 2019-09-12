import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import OptOut from './optout'
import OptIn from './optin'
import React from 'react'
import moment from 'moment'

class Channels extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    channels: PropTypes.array,
    contact: PropTypes.object
  }

  state = {
    expanded: null
  }

  render() {
    const { channels } = this.props
    const { expanded } = this.state
    return (
      <div className="crm-contact-channels">
        <table className="ui unstackable compact table">
          <tbody>
            { channels.map((program, i) => [
              <tr key={`program_${i}`} className="crm-contact-channels-program" >
                <td colSpan="3">
                  <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
                  { program.title }
                </td>
              </tr>,
              ...program.channels.map((channel, j) => [
                <tr key={`channel_${j}_channel`} className="crm-contact-channels-channel" onClick={ this._handleToggle.bind(this, `${i}-${j}`)}>
                  <td>
                    { `${i}-${j}` === expanded ?
                      <i className="fa fa-fw fa-caret-down" /> :
                      <i className="fa fa-fw fa-caret-right" />
                    } { channel.label }
                  </td>
                  <td className="collapsing">
                    { channel.type.toUpperCase() }
                  </td>
                  <td className="collapsing">
                    { channel.has_consented ?
                      <div className="ui mini red button" onClick={ this._handleOptOut.bind(this, channel, program) }>Opt Out</div> :
                      <div className="ui mini blue button" onClick={ this._handleOptIn.bind(this, channel, program) }>Opt In</div>
                    }
                  </td>
                </tr>,
                ...`${i}-${j}` === expanded ? [(
                  <tr key={`channel_${j}_details`} className="crm-contact-channels-channel">
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
                        <a href={`/crm/preferences/${channel.code}`} target="_blank">Update preferences</a>
                      }
                    </td>
                  </tr>
                )] : []
              ]),
              ...program.channels.length === 0 ? [(
                <tr key="channels_empty" className="crm-contact-channels-empty">
                  <td className="collapsing" colSpan="3">
                    There are no channels for this program
                  </td>
                </tr>
              )] : []
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

  _handleOptIn(channel, program, e) {
    e.stopPropagation()
    this.context.modal.open(<OptIn { ...this._getConsent(channel, program) } />)
  }

  _handleOptOut(channel, program, e) {
    e.stopPropagation()
    this.context.modal.open(<OptOut { ...this._getConsent(channel, program) } />)
  }

  _handleToggle(id) {
    this.setState({
      expanded: this.state.expanded === id ? null : id
    })
  }

}

export default Channels
