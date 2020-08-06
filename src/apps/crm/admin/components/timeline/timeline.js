import Note from '../../views/contacts/notes/new'
import { Button, Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import Activity from './activity'
import moment from 'moment'
import React from 'react'
import Call from './call'
import SMS from './sms'

class Timeline extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    activities: PropTypes.array,
    months: PropTypes.array,
    status: PropTypes.string,
    onFetch: PropTypes.func
  }

  static defaultProps = {}

  _handleFetch = this._handleFetch.bind(this)

  render() {
    const { contact, months, status } = this.props
    if(status === 'loading') return <Loader />
    return (
      <div className="crm-timeline">
        <div className="crm-timeline-buttons">
          <div className="ui fluid basic buttons">
            <Button { ...this._getNote() } />
            <Button { ...this._getEmail() } />
            <Button { ...this._getSMS() } />
            <Button { ...this._getCall() } />
          </div>
        </div>
        { months.map((month, index) => [
          <div className="crm-timeline-month" key={ `date_${index}` }>
            { index > 0 &&
              <div className="crm-timeline-date" key={ `date_${index}` }>
                { moment(month.date).format('MMMM YYYY') }
              </div>
            }
            <div className="crm-timeline-cards">
              { month.activities.map((activity, index) => (
                <Activity contact={ contact } activity={ activity } key={ `event_${index}` } />
              )) }
            </div>
          </div>
        ]) }
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getCall() {
    const { contact } = this.props
    return {
      label: 'Call',
      className: 'ui blue button',
      modal: {
        component: <Call contact={ contact } />,
        options: {
          width: 375,
          height: 667
        }
      }
    }
  }

  _getEmail() {
    const { contact } = this.props
    return {
      label: 'Email',
      className: 'ui button',
      modal: <Note contact={ contact } />
    }
  }

  _getSMS() {
    const { contact } = this.props
    return {
      label: 'SMS',
      className: 'ui button',
      modal: {
        component: <SMS contact={ contact } />,
        options: {
          width: 350,
          height: 650
        }
      }
    }
  }

  _getNote() {
    const { contact } = this.props
    return {
      label: 'Note',
      className: 'ui button',
      modal: <Note contact={ contact } />
    }
  }

  _handleFetch() {
    const { contact } = this.props
    this.props.onFetch(contact.id)
  }

  _handleJoin() {
    const { network } = this.context
    const { contact } = this.props
    const channel = `/admin/crm/contacts/${contact.id}/activities`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { contact } = this.props
    const channel = `/admin/crm/contacts/${contact.id}/activities`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

}

export default Timeline
