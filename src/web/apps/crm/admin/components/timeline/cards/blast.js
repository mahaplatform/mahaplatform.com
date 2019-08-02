import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Blast extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    const { date, subject, actions } = activity.data
    return (
      <div className="crm-card-blast">
        <div className="crm-card-header">
          <strong>Date:</strong> { moment(date).format('MMMM D, YYYY @ h:mm A') }<br />
          <strong>Subject:</strong> { subject }<br />
        </div>
        <div className="crm-card-body">
          { actions.map((action, index) => (
            <div className="crm-blast-action" key={`action_${index}`}>
              <div className="crm-blast-action-label">
                { action.action === 'received' &&
                  <span>received the email</span>
                }
                { action.action === 'opened' &&
                  <span>opened the email</span>
                }
                { action.action === 'viewed' &&
                  <span>viewed the email</span>
                }
                { action.action === 'clicked' &&
                  <span>clicked the link <span className="link">{ action.link }</span></span>
                }
              </div>
              <div className="crm-blast-action-timestamp">
                { moment(action.created_at).format('MM/DD/YY @ h:mm A') }
              </div>
            </div>
          )) }
        </div>
        <div className="link">View Email</div>
      </div>
    )
  }

}

export default Blast
