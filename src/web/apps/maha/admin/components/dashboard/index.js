import { ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import _ from 'lodash'

class Dashboard extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    rputer: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object,
    unseen: PropTypes.number
  }

  state = {
    time: moment().format('h:mm a')
  }

  render() {
    const first_name = this.props.user.full_name.split(' ')[0]
    return (
      <ModalPanel { ...this._getPanel() }>
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
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this._updateTime(),
      60000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
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
      className: 'maha-dashboard'
    }
  }
}

const mapStateToProps = (state, props) => ({
  team: state.maha.admin.team,
  user: state.maha.admin.user,
  unseen: 0//state.maha.host.unseen
})

export default connect(mapStateToProps)(Dashboard)
