import PropTypes from 'prop-types'
import { Avatar, Page } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class EmailsShow extends React.Component {

  static propTypes = {
    email: PropTypes.object
  }

  render() {
    const { email } = this.props
    return (
      <div className="team-email-canvas">
        <div className="team-email">
          <div className="team-email-header">
            { email.user &&
              <div className="team-email-header-avatar">
                <Avatar user={ email.user } presence={ false }/>
              </div>
            }
            <div className="team-email-header-details">
              <strong>From:</strong> { email.from }<br />
              <strong>To:</strong> { email.to }<br />
              <strong>Subject:</strong> { email.subject }
            </div>
          </div>
          <div className="team-email-body">
            <iframe border="0" src={ `data:text/html;charset=utf-8,${ encodeURIComponent(email.html) }`} />
          </div>
          <div className="team-email-feed">
            { email.activities.map((activity, index) => (
              <div className="team-email-feed-item" key={`feed_item_${index}`}>
                <div className="team-email-feed-item-icon">
                  <div className="team-email-feed-item-icon-badge">
                    <i className={`fa fa-fw fa-${activity.icon}`} />
                  </div>
                </div>
                <div className="team-email-feed-item-content">
                  <strong>{ moment(activity.created_at).format('MMM D, YYYY @ h:mm:ss A') }</strong><br />
                  { activity.description }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

}

const mapResourcesToPage = (props, context) => ({
  email: `/api/admin/crm/campaigns/email/${props.params.email_id}/deliveries/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: EmailsShow,
  tasks: {
    items: [
      {
        label: 'Resend Email',
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/crm/campaigns/email/${props.params.email_id}/deliveries/${props.params.id}/resend`,
          onFailure: (result) => {
            context.flash.set('error', 'Unable to resend email')
          },
          onSuccess: (result) => {
            context.flash.set('success', 'The email was successfully resent')
          }
        }
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
