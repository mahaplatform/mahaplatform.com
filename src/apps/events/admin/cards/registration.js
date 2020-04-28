import Content from '../../../crm/admin/tokens/content'
import { Button, Container } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Registration extends React.PureComponent {

  static propTypes = {
    activity: PropTypes.object,
    event: PropTypes.object,
    registration: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { registration } = this.props
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
            <tr>
              <td>Registration</td>
              <td><Button { ...this._getRegistration() } /></td>
            </tr>
            { registration.invoice_id &&
              <tr>
                <td>Invoice</td>
                <td><Button { ...this._getInvoice() } /></td>
              </tr>
            }
            <tr>
              <td>Workflow</td>
              <td><Button { ...this._getEnrollment() } /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  _getEnrollment() {
    const { registration } = this.props
    return {
      label: 'View Enrollment',
      className: 'link',
      route: `/admin/crm/workflows/${registration.enrollment.workflow_id}/enrollments/${registration.enrollment.id}`
    }
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

  _getRegistration() {
    const { event, registration } = this.props
    return {
      label: 'View Registration',
      className: 'link',
      route: `/admin/events/events/${event.id}/registrations/${registration.id}`
    }
  }

}

const mapResources = (props, context) => ({
  event: `/api/admin/events/events/${props.activity.data.event_id}`,
  registration: `/api/admin/events/events/${props.activity.data.event_id}/registrations/${props.activity.data.registration_id}`
})

export default Container(mapResources)(Registration)
