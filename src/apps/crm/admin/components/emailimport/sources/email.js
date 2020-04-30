import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Email extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    email: PropTypes.array
  }

  state = {
    expanded: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded } = this.state
    const { email } = this.props
    return (
      <div className="emailimport-email-token">
        <div className="emailimport-email-token-header">
          <div className="emailimport-email-token-header-icon" onClick={ this._handleToggle }>
            <i className={`fa fa-fw fa-chevron-${ this._getIcon() }`} />
          </div>
          <div className="emailimport-email-token-header-details">
            <div className="emailimport-email-token-timestamp">
              { this._getTimestamp() }<br />
            </div>
            { email.subject }
          </div>
        </div>
        { expanded &&
          <div className="emailimport-email-token-body">
            <div className="emailimport-email-token-preview">
              <div className="emailimport-email-token-preview-header">
                <strong>Sent: </strong> { this._getTimestamp() }<br />
                <strong>From: </strong> { email.from.rfc822 }<br />
                <strong>To: </strong> { email.to.map(email => email.rfc822).join(', ') }<br />
                { email.cc &&
                  <div>
                    <strong>CC: </strong> { email.cc.map(email => email.rfc822).join(', ') }
                  </div>
                }
                { email.bcc &&
                  <div>
                    <strong>BCC: </strong> { email.bcc.map(email => email.rfc822).join(', ') }
                  </div>
                }
                <strong>Subject: </strong> { email.subject }<br />
              </div>
              <div className="emailimport-email-token-preview-body">
                { email.text }
                { email.attachments.length > 0 &&
                  <div className="emailimport-email-token-preview-attachments">
                    { email.attachments.map((attachment, index) => (
                      <div className="emailimport-email-token-preview-attachment" key={`attachment_${index}`}>
                        <i className="fa fa-file-o" /> { attachment.filename }
                      </div>
                    )) }
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  _getTimestamp() {
    const { email } = this.props
    return moment(email.date).format('MM/DD/YYYY @ HH:mmA')
  }

  _getIcon() {
    const { expanded } = this.state
    return expanded ? 'down' : 'right'
  }

  _handleToggle(e) {
    const { expanded } = this.state
    e.stopPropagation()
    this.setState({
      expanded: !expanded
    })
  }

}

export default Email
