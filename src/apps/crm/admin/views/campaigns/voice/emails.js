import { Button }from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Emails extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    emails: PropTypes.array,
    workflow: PropTypes.object
  }

  render() {
    const { emails } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td className="collapsing">Sent</td>
              <td className="collapsing">Open Rate</td>
              <td className="collapsing">Click Rate</td>
              <td className="collapsing">Bounce Rate</td>
              <td className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { emails.length === 0 &&
              <tr>
                <td colSpan="6" className="center">
                  There are no emails for this workflow
                </td>
              </tr>
            }
            { emails.map((email, index) => (
              <tr key={`email_${index}`} onClick={ this._handleClick.bind(this, email) }>
                <td>
                  { email.title }
                </td>
                <td className="right">
                  { email.sent }
                </td>
                <td className="right">
                  { numeral(email.open_rate).format('0.0%') }
                </td>
                <td className="right">
                  { numeral(email.click_rate).format('0.0%') }
                </td>
                <td className="right">
                  { numeral(email.bounce_rate).format('0.0%') }
                </td>
                <td className="proceed">
                  <i className="fa fa-chevron-right" />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  _handleClick(email) {
    this.context.router.history.push(`/crm/emails/${email.id}`)
  }

}
export default Emails
