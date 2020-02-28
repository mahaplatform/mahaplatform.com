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
                <th className="center aligned">Opened</th>
                <th className="center aligned">Clicked</th>
                <th className="center aligned">Bounced</th>
                <th className="center aligned">Unsubscribed</th>
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
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'was_opened')}>
                    <strong>{ this._getRate(email.results.opened, email.results.delivered) }</strong>
                    <span>{ email.results.opened } / { email.results.delivered }</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'was_clicked')}>
                    <strong>{ this._getRate(email.results.clicked, email.results.delivered) }</strong>
                    <span>{ email.results.clicked } / { email.results.delivered }</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'was_bounced')}>
                    <strong>{ this._getRate(email.results.bounced, email.results.delivered) }</strong>
                    <span>{ email.results.bounced } / { email.results.delivered }</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'was_unsubscribed')}>
                    <strong>{ this._getRate(email.results.unsubscribed, email.results.delivered) }</strong>
                    <span>{ email.results.unsubscribed } / { email.results.delivered }</span>
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
      route: `/admin/crm/emails/${email.id}`
    }
  }

  _handleClick(email, report) {
    const { router } = this.context
    const query = report ? `?$filter[${report}][$eq]=true` : ''
    router.history.push(`/admin/crm/emails/${email.id}/deliveries${query}`)
  }

}
export default Emails
