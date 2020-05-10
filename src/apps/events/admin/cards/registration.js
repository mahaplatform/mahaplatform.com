import WorkflowActions from '../../../crm/admin/components/workflow_actions'
import Content from '../../../crm/admin/tokens/content'
import { Button, Container } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Registration extends React.PureComponent {

  static propTypes = {
    actions: PropTypes.array,
    activity: PropTypes.object,
    enrollment: PropTypes.object,
    event: PropTypes.object,
    registration: PropTypes.object,
    program: PropTypes.object,
    workflow: PropTypes.object
  }

  render() {
    const { actions, enrollment, registration, workflow } = this.props
    const fields = this._getFields()
    return (
      <div className="crm-form-card">
        <table className="ui celled compact unstackable table">
          <tbody>
            <tr>
              <td>Event</td>
              <td><Button { ...this._getEvent() } /></td>
            </tr>
            <tr>
              <td>First Name</td>
              <td>{ registration.data.first_name }</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{ registration.data.last_name }</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{ registration.data.email }</td>
            </tr>
            { fields.map((field, index) => (
              <tr key={`field_${index}`}>
                <td>{ field.name.value }</td>
                <td>
                  <Content data={ registration.data } field={ field } />
                </td>
              </tr>
            )) }
            <tr>
              <td>Revenue</td>
              <td>{ numeral(registration.revenue).format('$0.00') }</td>
            </tr>
            { registration.invoice_id &&
              <tr>
                <td>Invoice</td>
                <td><Button { ...this._getInvoice() } /></td>
              </tr>
            }
          </tbody>
        </table>
        <WorkflowActions workflow={ workflow } enrollment={ enrollment } actions={ actions } trigger_type={ workflow.trigger_type } />
      </div>
    )
  }

  _getEvent() {
    const { event } = this.props
    return {
      label: event.title,
      className: 'link',
      route: `/admin/events/events/${event.id}`
    }
  }

  _getFields() {
    const { event } = this.props
    return event.contact_config.fields.filter(field => {
      return field.type !== 'text'
    })
  }

  _getInvoice() {
    const { registration } = this.props
    return {
      label: 'View Invoice',
      className: 'link',
      route: `/admin/finance/invoices/${registration.invoice_id}`
    }
  }

}

const mapResources = (props, context) => ({
  actions: `/api/admin/events/events/${props.activity.data.event_id}/registrations/${props.activity.data.registration_id}/actions`,
  enrollment: `/api/admin/events/events/${props.activity.data.event_id}/registrations/${props.activity.data.registration_id}/enrollment`,
  event: `/api/admin/events/events/${props.activity.data.event_id}`,
  registration: `/api/admin/events/events/${props.activity.data.event_id}/registrations/${props.activity.data.registration_id}`,
  workflow: `/api/admin/events/events/${props.activity.data.event_id}/workflow`
})

export default Container(mapResources)(Registration)
