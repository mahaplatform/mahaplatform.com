import TriggerTypeToken from '../../../tokens/trigger_type'
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
                <th width="80" />
                <th>Title</th>
                <th width="80" className="center aligned">Enrolled</th>
                <th width="80" className="center aligned">Active</th>
                <th width="80" className="center aligned">Lost</th>
                <th width="80" className="center aligned">Converted</th>
                <th width="80" className="center aligned">Completed</th>
              </tr>
            </thead>
            <tbody>
              { workflows.length === 0 &&
                <tr>
                  <td colSpan="7"> There are no workflows for this form</td>
                </tr>
              }
              { workflows.map((workflow, index) => (
                <tr key={`workflow_${index}`}>
                  <td>
                    <TriggerTypeToken value={ workflow.trigger_type } />
                  </td>
                  <td>
                    <Button { ...this._getWorkflow(workflow) } /><br />
                    <span>Triggered when contact completes form</span>
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'sent')}>
                    { workflow.enrolled }
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'delivered')}>
                    { workflow.active }
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'opened')}>
                    { workflow.lost }
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'complained')}>
                    { workflow.converted }
                  </td>
                  <td className="center aligned" onClick={ this._handleClick.bind(this, workflow, 'clicked')}>
                    { workflow.completed }
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
    router.history.push(`/crm/workflows/${workflow.id}/enrollments?report=${report}`)
  }

}
export default Workflows
