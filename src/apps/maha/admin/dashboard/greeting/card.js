import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import _ from 'lodash'

class Dashboard extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    isOwner: PropTypes.bool,
    onTasks: PropTypes.func
  }

  state = {
    time: moment().format('h:mm a')
  }

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { isOwner } = this.props
    const { admin } = this.context
    const first_name = admin.user.full_name.split(' ')[0]
    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>Welcome to Maha</h2>
            <h3>Greeting</h3>
          </div>
          { isOwner &&
            <div className="maha-dashboard-card-header-icon" onClick={ this._handleTasks }>
              <i className="fa fa-ellipsis-v" />
            </div>
          }
        </div>
        <div className="maha-dashboard-card-body">
          <div className={`dashboard-welcome ${ this._getTimeOfDay() }`}>
            <div className="dashboard-wrapper">
              <div className="welcome">
                { this._getSalutation(this.state.time) }, { first_name }!
              </div>
              <div className="time">
                { this.state.time }
              </div>
              <div className="date">
                { moment().format('dddd, MMM Do, YYYY') }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.interval = setInterval(this._updateTime, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  _updateTime() {
    this.setState({
      time: moment().format('h:mm a')
    })
  }

  _getSalutation() {
    if( this._getTimeOfDay() === 'afternoon' && moment().format('dd') == 'Fr' ) return 'T.G.I.F.'
    if( this._getTimeOfDay() === 'night' ) return 'It\'s late - go to bed'
    return (this._getTimeOfDay()) ? 'Good ' + _.startCase(this._getTimeOfDay()) : 'Welcome'
  }

  _getTimeOfDay(){
    const currentHour = parseFloat(moment().format('HH'))
    if(currentHour >= 5 && currentHour <= 11) {
      return 'morning'
    } else if(currentHour >= 12 && currentHour <= 16) {
      return 'afternoon'
    } else if(currentHour >= 17 && currentHour <= 21) {
      return 'evening'
    } else {
      return 'night'
    }
  }

  _getPanel() {
    return {
      className: 'dashboard'
    }
  }

  _handleTasks() {
    this.props.onTasks()
  }

}

export default Dashboard
