import { Button }from 'maha-admin'
import PropTypes from 'prop-types'
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
                <th className="center aligned">Sent</th>
                <th className="center aligned">Delivered</th>
                <th className="center aligned">Opened</th>
                <th className="center aligned">Complained</th>
                <th className="center aligned">Clicked</th>
              </tr>
            </thead>
            <tbody>
              { emails.map((email, index) => (
                <tr key={`email_${index}`}>
                  <td>
                    <Button { ...this._getEmail(email) } />
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'sent')}>
                    <strong>80.7%</strong>
                    <span>162 / 200</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'delivered')}>
                    <strong>80.7%</strong>
                    <span>162 / 200</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'opened')}>
                    <strong>80.7%</strong>
                    <span>162 / 200</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'complained')}>
                    <strong>80.7%</strong>
                    <span>162 / 200</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'clicked')}>
                    <strong>80.7%</strong>
                    <span>162 / 200</span>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getEmail(email) {
    return {
      label: email.title,
      className: 'link',
      route: `/admin/crm/emails/${email.code}`
    }
  }

  _handleClick(email, report) {
    const { router } = this.context
    router.history.push(`/admin/crm/emails/${email.code}/deliveries?report=${report}`)
  }

}
export default Emails
