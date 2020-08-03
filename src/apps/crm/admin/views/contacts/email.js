import { Avatar, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import moment from 'moment'
import React from 'react'

class Email extends React.Component {

  static propTypes = {
    email: PropTypes.object
  }

  iframe = null

  state = {
    height: 0
  }

  _handleResize = this._handleResize.bind(this)

  render() {
    const { height } = this.state
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
            <iframe ref={ node => this.iframe = node } border="0" style={{ height }} src={`${process.env.WEB_HOST}/w${email.code}`} />
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

  componentDidMount() {
    this.pasteur = new Pasteur({
      window,
      target: this.iframe.contentWindow,
      name: 'viewer',
      targetName: 'email'
    })
    this.pasteur.on('resize', this._handleResize)
  }

  _handleResize(height) {
    this.setState({ height })
  }

}

const mapResourcesToPage = (props, context) => ({
  email: `/api/admin/crm/contacts/${props.params.contact_id}/emails/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: Email,
  tasks: {
    items: [
      {
        label: 'Resend Email',
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/crm/contacts/${props.params.contact_id}/emails/${props.params.id}/resend`,
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
