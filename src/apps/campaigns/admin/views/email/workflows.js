import { Button }from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Workflows extends React.Component {

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
              { workflows.map((workflow, index) => (
                <tr key={`workflow_${index}`}>
                  <td>
                    <Button { ...this._getWorkflow(workflow) } /><br />
                    <span>Triggered when contact clicks on link</span>
                  </td>
                  <td className="center aligned">
                    <Button { ...this._getStat(workflow, 'enrolled') } />
                  </td>
                  <td className="center aligned">
                    <Button { ...this._getStat(workflow, 'active') } />
                  </td>
                  <td className="center aligned">
                    <Button { ...this._getStat(workflow, 'lost') } />
                  </td>
                  <td className="center aligned">
                    <Button { ...this._getStat(workflow, 'converted') } />
                  </td>
                  <td className="center aligned">
                    <Button { ...this._getStat(workflow, 'completed') } />
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getStat(workflow, report) {
    return {
      label: workflow[report],
      className: 'link',
      route: `/admin/automation/workflows/${workflow.id}/enrollments?report=${report}`
    }
  }

  _getWorkflow(workflow) {
    return {
      label: workflow.title,
      className: 'link',
      route: `/admin/automation/workflows/${workflow.id}`
    }
  }

}
export default Workflows
