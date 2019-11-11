import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import React from 'react'

class WorkflowDesigner extends React.PureComponent {

  static propTypes = {
    workflow: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { workflow, onSave } = this.props
    const { steps, status } = workflow
    return {
      blocks: [
        {
          icon: 'comment',
          label: 'Trigger',
          type: 'trigger',
          action: 'trigger',
          token: () => 'Form is completed'
        },
        { action: 'ifelse' },
        { action: 'wait' },
        {
          action: 'send_email',
          mapping: {
            emails: {
              endpoint: `/api/admin/crm/workflows/${workflow.id}/emails`
            }
          }
        },
        {
          action: 'add_to_list',
          mapping: {
            lists: {
              endpoint: `/api/admin/crm/programs/${workflow.program.id}/lists`,
              filter: { type: { $eq: 'static' } }
            }
          }
        },
        {
          action: 'remove_from_list',
          mapping: {
            lists: {
              endpoint: `/api/admin/crm/programs/${workflow.program.id}/lists`,
              filter: { type: { $eq: 'static' } }
            }
          }
        },
        {
          action: 'add_interest',
          mapping: {
            topics: {
              endpoint: `/api/admin/crm/programs/${workflow.program.id}/topics`
            }
          }
        },
        {
          action: 'remove_interest',
          mapping: {
            topics: {
              endpoint: `/api/admin/crm/programs/${workflow.program.id}/topics`
            }
          }
        },
        {
          action: 'enroll_in_workflow',
          mapping: {
            workflows: {
              endpoint: '/api/admin/crm/workflows',
              filter: {
                $and: [
                  { program_id: { $eq: workflow.program.id } },
                  { id: { $neq: workflow.id } }
                ]
              }
            }
          }
        },
        {
          action: 'update_property',
          mapping: {
            fields: {
              endpoint: `/api/admin/crm/programs/${workflow.program.id}/fields`
            }
          }
        },
        {
          action: 'send_internal_email',
          mapping: {
            users: {
              endpoint: '/api/admin/users'
            },
            emails: {
              endpoint: `/api/admin/crm/workflows/${workflow.id}/emails`
            }
          }
        },
        {
          action: 'send_internal_sms' ,
          mapping: {
            users: {
              endpoint: '/api/admin/users',
              filter: { cell_phone: { $neq: 'null' } }
            }
          }
        },
        { action: 'goal' },
        {
          icon: 'phone',
          label: 'Complete Workflow',
          type: 'ending',
          action: 'ending'
        }
      ],
      defaultValue: steps,
      status,
      onSave
    }
  }

}

export default WorkflowDesigner
