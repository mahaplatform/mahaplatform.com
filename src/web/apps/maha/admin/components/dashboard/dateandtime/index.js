import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Dateandtime extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      time: moment().format('h:mm a')
    }
  }

  render() {
    return (
      <div className="date-and-time">
        <div className="welcome">
          <span>{ this._getSalutation(this.state.time) }, { this._getFirstName() }!</span>
        </div>
        <div className="time">
          <span>{ this.state.time }</span>
        </div>
        <div className="date">
          <span>{ moment().format('dddd, MMM Do, YYYY') }</span>
        </div>
      </div>
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

  _getFirstName() {
    return this.context.admin.user.full_name.split(' ')[0]
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
}

export default Dateandtime
