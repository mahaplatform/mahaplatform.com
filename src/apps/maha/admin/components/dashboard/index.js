import { Button, ImageEditor, ModalPanel } from '@admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import _ from 'lodash'

class Dashboard extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    host: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
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
            <Button { ...this._getHorizontal()} />
            <Button { ...this._getVertical()} />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getHorizontal() {
    const asset = {
      "id": 8346,
      "original_file_name": "10156387003857338.jpg",
      "file_name": "10156387003857338.jpg",
      "content_type": "image/jpeg",
      "file_size": 62923,
      "status": "processed",
      "has_preview": false,
      "is_infected": false,
      "metadata": {
        "width": 960,
        "height": 720
      },
      "path": "/assets/8346/10156387003857338.jpg",
      "signed_url": "https://s3.amazonaws.com/dev.cdn.mahaplatform.com/assets/8346/10156387003857338.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5QC4GVH4PMU7AWVO%2F20210117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210117T004703Z&X-Amz-Expires=604800&X-Amz-Signature=5b7a61af4147e7f343769071c768b23463243cc7b757659ad98538f1458ff46d&X-Amz-SignedHeaders=host",
      "source": "facebook",
      "source_url": null,
      "user": {
        "id": 79,
        "full_name": "Gregory Kops",
        "initials": "gk",
        "photo": "/assets/19532/me.jpg"
      },
      "created_at": "2019-07-23T21:06:42.045Z",
      "updated_at": "2019-07-24T17:39:30.585Z"
    }
    return {
      label: 'Horizontal',
      modal: <ImageEditor asset={ asset} />
    }
  }

  _getVertical() {
    const asset = {
      "id": 8368,
      "original_file_name": "ava.jpg",
      "file_name": "ava.jpg",
      "content_type": "image/jpeg",
      "file_size": 974479,
      "status": "processed",
      "has_preview": false,
      "is_infected": false,
      "metadata": {
        "width": 750,
        "height": 1334
      },
      "path": "/assets/8368/ava.jpg",
      "signed_url": "https://s3.amazonaws.com/dev.cdn.mahaplatform.com/assets/8368/ava.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5QC4GVH4PMU7AWVO%2F20210117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210117T214909Z&X-Amz-Expires=604800&X-Amz-Signature=89b341afc97e0e7c65e54c8d7a07985b655e5b9ec35a65c66dd6e06d7b5f656b&X-Amz-SignedHeaders=host",
      "source": "device",
      "source_url": null,
      "user": {
        "id": 79,
        "full_name": "Gregory Kops",
        "initials": "gk",
        "photo": "/assets/19532/me.jpg"
      },
      "created_at": "2019-07-24T16:39:15.109Z",
      "updated_at": "2019-07-24T16:39:18.865Z"
    }
    return {
      label: 'Veritcal',
      modal: <ImageEditor asset={ asset} />
    }
  }

  componentDidMount() {
    this.context.host.setTitle('Dashboard')
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
      className: 'dashboard'
    }
  }
}

const mapStateToProps = (state, props) => ({
  team: state.maha.admin.team,
  user: state.maha.admin.user,
  unseen: 0//state.maha.host.unseen
})

export default connect(mapStateToProps)(Dashboard)
