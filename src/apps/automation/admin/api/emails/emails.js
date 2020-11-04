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
      <div className="crm-email-leaderboard">
        <div className="crm-email-leaderboard-header">
          Emails
        </div>
        <div className="crm-email-leaderboard-body">
          <table className="ui unstackable table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="center aligned">Delivered</th>
                <th className="center aligned">Opened</th>
                <th className="center aligned">Complained</th>
                <th className="center aligned">Clicked</th>
              </tr>
            </thead>
            <tbody>
              { emails.length === 0 &&
                <tr>
                  <td colSpan="5">
                    There are no emails for this workflow
                  </td>
                </tr>
              }
              { emails.map((email, index) => (
                <tr key={`email_${index}`}>
                  <td>
                    <Button { ...this._getEmail(email) } />
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'delivered')}>
                    <strong>{ this._getRate(email.delivered, email.sent) }</strong>
                    <span>{ email.delivered } / { email.sent }</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'opened')}>
                    <strong>{ this._getRate(email.opened, email.delivered) }</strong>
                    <span>{ email.opened } / { email.delivered }</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'complained')}>
                    <strong>{ this._getRate(email.complained, email.delivered) }</strong>
                    <span>{ email.complained } / { email.delivered }</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'clicked')}>
                    <strong>{ this._getRate(email.clicked, email.delivered) }</strong>
                    <span>{ email.clicked } / { email.delivered }</span>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getRate(numerator, denomenator) {
    if(denomenator === 0) return '0%'
    return numeral(numerator / denomenator).format('0.0%')
  }

  _getEmail(email) {
    return {
      label: email.title,
      className: 'link',
      route: `/admin/automation/emails/${email.id}`
    }
  }

  _handleClick(email, report) {
    const { router } = this.context
    router.history.push(`/automation/emails/${email.id}/deliveries?report=${report}`)
  }

}
export default Emails
