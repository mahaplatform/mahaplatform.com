import { Image, Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Consentfield extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    consent: PropTypes.array,
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    programs: PropTypes.array,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    const { programs, status } = this.props
    if(status !== 'success') return <Loader />
    return (
      <div className="consentfield">
        <div className="crm-contact-preferences">
          <table className="ui table">
            <tbody>
              { programs.map((program, i) => [
                <tr key={`program_${i}`}>
                  <td className="crm-contact-program">
                    <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
                    { program.title }
                  </td>
                </tr>,
                <tr key={`consent_${i}`}>
                  <td className="crm-contact-consents">
                    <strong>Channels</strong><br />
                    <ul>
                      { program.channels.map((channel, j) => (
                        <li key={`channel_${j}`} onClick={ this._handleToggle.bind(this, program.id, channel.type, channel.id) }>
                          { this._getChecked(program.id, channel.type, channel.id) ?
                            <i className="fa fa-check-circle" /> :
                            <i className="fa fa-circle-o" />
                          }
                          { channel.label }
                        </li>
                      )) }
                    </ul>
                  </td>
                </tr>,
                <tr key={`interests_${i}`}>
                  <td className="crm-contact-consents">
                    <strong>Interests</strong><br />
                    <ul>
                      { program.topics.map((topic, index) => (
                        <li key={`topic_${index}`} onClick={ this._handleToggle.bind(this, program.id, 'topic', topic.id) }>
                          { this._getChecked(program.id, 'topic', topic.id) ?
                            <i className="fa fa-check-circle" /> :
                            <i className="fa fa-circle-o" />
                          }
                          { topic.title }
                        </li>
                      )) }
                    </ul>
                    { program.topics.length === 0 &&
                      <p>There are no topics for this program</p>
                    }
                  </td>
                </tr>
              ]) }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, endpoint, onFetch, onSet } = this.props
    onFetch(endpoint)
    if(defaultValue) onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      this.props.onReady()
    }
  }

  _getChecked(program_id, key, value) {
    const { consent } = this.props
    const program = _.find(consent, { program_id })
    return _.includes(program[`${key}_ids`], value)
  }

  _handleToggle(program_id, key, value) {
    this.props.onToggle(program_id, `${key}_ids`, value)
  }
}

export default Consentfield
