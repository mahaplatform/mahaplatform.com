import { Button }from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Workflows extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    workflows: PropTypes.array,
    form: PropTypes.object
  }

  render() {
    const workflows = [
      { code: 'jd0k8rfbnv', title: 'Results and Confirmation' }
    ]
    return (
      <div className="crm-email-leaderboard">
        <div className="crm-email-leaderboard-header">
          Workflows
        </div>
        <div className="crm-email-leaderboard-body">
          <table className="ui unstackable table">
            <thead>
              <tr>
                <th>Title</th>
                <th className="center aligned">Enrollments</th>
                <th className="center aligned">Active</th>
                <th className="center aligned">Lost</th>
                <th className="center aligned">Completed</th>
                <th className="center aligned">Completed</th>
              </tr>
            </thead>
            <tbody>
              { workflows.map((email, index) => (
                <tr key={`email_${index}`}>
                  <td>
                    <Button { ...this._getEmail(email) } /><br />
                    Triggered when form is completed
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'sent')}>
                    162
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'delivered')}>
                    162
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'opened')}>
                    162
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'complained')}>
                    162
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, email, 'clicked')}>
                    162
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
      route: `/admin/crm/workflows/${email.code}`
    }
  }

  _handleClick(workflows, report) {
    const { router } = this.context
    router.history.push(`/admin/crm/workflows/${workflows.code}/deliveries?report=${report}`)
  }

}
export default Workflows
