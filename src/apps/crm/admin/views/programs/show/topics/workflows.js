import { Button, Message, StatusToken } from '@admin'
import PropTypes from 'prop-types'
import Workflow from './workflow'
import React from 'react'

class Workflows extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    topic: PropTypes.object,
    workflows: PropTypes.array
  }

  render() {
    const { workflows } = this.props
    if(workflows.length === 0) return <Message { ...this._getEmpty() } />
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td className="collapsing">Enrolled</td>
              <td className="collapsing">Active</td>
              <td className="collapsing">Lost</td>
              <td className="collapsing">Converted</td>
              <td className="collapsing">Completed</td>
              <td className="collapsing">Status</td>
              <td className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { workflows.length === 0 &&
              <tr>
                <td colSpan="8" className="empty">
                  There are no workflows for this topic
                </td>
              </tr>
            }
            { workflows.map((workflow, index) => (
              <tr key={`workflow_${index}`} onClick={ this._handleClick.bind(this, workflow) }>
                <td>{ workflow.title }</td>
                <td className="center aligned">{ workflow.enrolled_count }</td>
                <td className="center aligned">{ workflow.active_count }</td>
                <td className="center aligned">{ workflow.lost_count }</td>
                <td className="center aligned">{ workflow.converted_count }</td>
                <td className="center aligned">{ workflow.completed_count }</td>
                <td className="center aligned">
                  <StatusToken value={ workflow.status } />
                </td>
                <td className="proceed">
                  <i className="fa fa-chevron-right" />
                </td>
              </tr>
            )) }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="8">
                <Button { ...this._getNew() } />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  _getEmpty() {
    const { topic } = this.props
    return {
      title: 'No Workflows',
      text: 'There are no worfklows for this list',
      icon: 'gears',
      buttons: [
        { label: 'Create Workflow', modal: <Workflow topic={ topic } /> }
      ]
    }
  }

  _getNew() {
    const { topic } = this.props
    return {
      label: 'Create Workflow',
      color: 'blue',
      modal: <Workflow topic={ topic } />
    }
  }

  _handleClick(workflow) {
    this.context.router.history.push(`/admin/automation/workflows/${workflow.id}`)
  }

}
export default Workflows
