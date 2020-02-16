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
                    { activity.type === 'delivery' && <i className="fa fa-fw fa-paper-plane"></i> }
                    { activity.type === 'bounce' && <i className="fa fa-fw fa-exclamation-triangle"></i> }
                    { activity.type === 'open' && <i className="fa fa-fw fa-envelope-open"></i> }
                    { activity.type === 'complaint' && <i className="fa fa-fw fa-bullhorn"></i> }
                    { activity.type === 'webview' && <i className="fa fa-fw fa-globe"></i> }
                    { activity.type === 'forward' && <i className="fa fa-fw fa-arrow-pointer"></i> }
                    { activity.type === 'unsubscribe' && <i className="fa fa-fw fa-times"></i> }
                    { activity.type === 'click' && <i className="fa fa-fw fa-mouse-pointer"></i> }
                    { activity.type === 'social' && <i className={`fa fa-fw fa-${activity.service}`}></i> }
                  </div>
                </div>
                <div className="team-email-feed-item-content">
                  <strong>{ moment(activity.created_at).format('MMM D, YYYY @ h:mm:ss A') }</strong><br />
                  { activity.type === 'delivery' && 'email was delivered' }
                  { activity.type === 'bounce' && 'email was bounced' }
                  { activity.type === 'open' && 'opened email' }
                  { activity.type === 'complaint' && 'complained about this email' }
                  { activity.type === 'webview' && 'viewed the email online' }
                  { activity.type === 'forward' && 'forwarded the email' }
                  { activity.type === 'unsubscribe' && 'opted out of future communications' }
                  { activity.type === 'click' && `clicked the link ${activity.link.text}` }
                  { activity.type === 'social' && `shared on ${activity.service}` }
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
  email: `/api/admin/team/emails/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  rights: ['team:manage_team'],
  component: EmailsShow,
  tasks: {
    items: [
      {
        label: 'Resend Email',
        rights: ['team:manage_team'],
        show: resources.email.was_opened !== true,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/team/emails/${resources.email.id}/resend`,
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
