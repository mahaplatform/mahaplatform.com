import PropTypes from 'prop-types'
import React from 'react'

class Preferences extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    if(!activity.data) return null
    const { type, email_address, mailing_address, phone_number, actions } = activity.data
    return (
      <div className="crm-form-card">
        <table className="ui celled compact unstackable table">
          <tbody>
            { phone_number &&
              <tr>
                <td>Phone Number</td>
                <td>{ phone_number }</td>
              </tr>
            }
            { email_address &&
              <tr>
                <td>Email Address</td>
                <td>{ email_address }</td>
              </tr>
            }
            { mailing_address &&
              <tr>
                <td>Mailing Address</td>
                <td>{ mailing_address }</td>
              </tr>
            }
            <tr>
              <td>Channel</td>
              <td>{ type.toUpperCase() }</td>
            </tr>
          </tbody>
        </table>
        <ul>
          { actions && actions.map((item, index) => (
            <li key={`item_${index}`}>
              { item.action === 'unconsented' &&
                <span>opted out of all communications</span>
              }
              { item.action === 'consented' &&
                <span>opted in to all communications</span>
              }
              { item.action === 'subscribed' &&
                <span>subscribed to { item.topic }</span>
              }
              { item.action === 'unsubscribed' &&
                <span>unsubscribed from { item.topic }</span>
              }
            </li>
          )) }
        </ul>
      </div>
    )
  }

}

export default Preferences
