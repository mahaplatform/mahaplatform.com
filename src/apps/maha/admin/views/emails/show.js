import { Avatar, Page } from '@admin'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import moment from 'moment'
import React from 'react'

class EmailsShow extends React.Component {

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
              { email.cc &&
                <span><strong>CC:</strong> { email.cc }<br /></span>
              }
              { email.bcc &&
                <span><strong>BCC:</strong> { email.bcc }<br /></span>
              }
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
                  <div className="team-email-feed-item-timestamp">
                    { moment(activity.created_at).format('MMM D, YYYY @ h:mm A') }<br />
                  </div>
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
  email: `/api/admin/emails/${props.params.code}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: EmailsShow
})

export default Page(mapResourcesToPage, mapPropsToPage)
