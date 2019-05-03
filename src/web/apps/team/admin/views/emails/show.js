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
      <div className="email-canvas">
        <div className="email">
          <div className="email-header">
            <div className="email-header-avatar">
              <Avatar user={ email.user } presence={ false }/>
            </div>
            <div className="email-header-details">
              <strong>To:</strong> { email.to }<br />
              <strong>Subject:</strong> { email.subject }
            </div>
          </div>
          <div className="email-body">
            <iframe border="0" src={ `data:text/html;charset=utf-8,${ email.html }`} />
          </div>
          <div className="email-feed">
            { email.sent_at &&
              <div className="email-feed-item">
                <div className="email-feed-item-icon">
                  <div className="email-feed-item-icon-badge">
                    <i className="fa fa-fw fa-paper-plane"></i>
                  </div>
                </div>
                <div className="email-feed-item-content">
                  <strong>{ moment(email.sent_at).format('MMM D, YYYY @ h:mm:ss A') }</strong><br />
                  email was sent
                </div>
              </div>
            }
            { email.activities.map((activity, index) => (
              <div className="email-feed-item" key={`feed_item_${index}`}>
                <div className="email-feed-item-icon">
                  <div className="email-feed-item-icon-badge">
                    { activity.type === 'open' && <i className="fa fa-fw fa-envelope-open"></i> }
                    { activity.type === 'click' && <i className="fa fa-fw fa-mouse-pointer"></i> }
                  </div>
                </div>
                <div className="email-feed-item-content">
                  <strong>{ moment(activity.created_at).format('MMM D, YYYY @ h:mm:ss A') }</strong><br />
                  { activity.type === 'open' && 'opened email' }
                  { activity.type === 'click' && `clicked the link ${activity.link.text}` }
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
