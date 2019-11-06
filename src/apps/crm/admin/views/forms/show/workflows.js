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
    const { workflows } = this.props
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
                <th className="center aligned">Enrolled</th>
                <th className="center aligned">Active</th>
                <th className="center aligned">Lost</th>
                <th className="center aligned">Converted</th>
                <th className="center aligned">Completed</th>
              </tr>
            </thead>
            <tbody>
              { workflows.length === 0 &&
                <tr>
                  <td colSpan="6"> There are no workflows for this form</td>
                </tr>
              }
              { workflows.map((workflow, index) => (
                <tr key={`workflow_${index}`}>
                  <td>
                    <Button { ...this._getWorkflow(workflow) } /><br />
                    <span>Triggered when contact completes form</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'sent')}>
                    155
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'delivered')}>
                    0
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'opened')}>
                    0
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'complained')}>
                    155
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'clicked')}>
                    155
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getWorkflow(workflow) {
    return {
      label: workflow.title,
      className: 'link',
      route: `/admin/crm/workflows/${workflow.id}`
    }
  }

  _handleClick(workflow, report) {
    const { router } = this.context
    router.history.push(`/admin/crm/workflows/${workflow.id}/enrollments?report=${report}`)
  }

}
export default Workflows
