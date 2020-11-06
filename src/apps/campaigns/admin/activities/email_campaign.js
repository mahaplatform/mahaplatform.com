import { Button, Container } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class EmailCampaign extends React.PureComponent {

  static propTypes = {
    activity: PropTypes.object,
    email: PropTypes.object,
    email_campaign: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { email } = this.props
    return (
      <div className="crm-form-card">
        <table className="ui celled compact unstackable table">
          <tbody>
            <tr>
              <td>Email Campaign</td>
              <td><Button { ...this._getCampaign() } /></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><Button { ...this._getDelivery() } /></td>
            </tr>
            { email.enrollment &&
              <tr>
                <td>Workflow</td>
                <td><Button { ...this._getEnrollment() } /></td>
              </tr>
            }
          </tbody>
        </table>
        <div className="team-email-feed">
          { email.activities.map((activity, index) => (
            <div className="team-email-feed-item" key={`feed_item_${index}`}>
              <div className="team-email-feed-item-icon">
                <div className="team-email-feed-item-icon-badge">
                  <i className={`fa fa-fw fa-${activity.icon}`} />
                </div>
              </div>
              <div className="team-email-feed-item-content">
                <div className="team-email-feed-item-timestamp">
                  { moment(activity.created_at).format('MMM D, YYYY @ h:mm A') }<br />
                </div>
                { activity.description }
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  _getCampaign() {
    const { email_campaign } = this.props
    return {
      label: email_campaign.title,
      className: 'link',
      route: `/admin/campaigns/email/${email_campaign.id}`
    }
  }

  _getDelivery() {
    const { email } = this.props
    return {
      label: 'View Email',
      className: 'link',
      route: `/admin/emails/${email.code}`
    }
  }

  _getEnrollment() {
    const { email } = this.props
    return {
      label: 'View Enrollment',
      className: 'link',
      route: `/admin/automation/workflows/${email.enrollment.workflow_id}/enrollments/${email.enrollment.id}`
    }
  }

}

const mapResources = (props, context) => ({
  email_campaign: `/api/admin/campaigns/email/${props.activity.data.email_campaign_id}`,
  email: `/api/admin/campaigns/email/${props.activity.data.email_campaign_id}/deliveries/${props.activity.data.email_id}`
})

export default Container(mapResources)(EmailCampaign)
