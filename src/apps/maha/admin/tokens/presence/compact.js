import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Token extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number,
    presence: PropTypes.array
  }

  render() {
    const status = this._getStatus()
    return (
      <div className="presence-token">
        { status && <div className={ `presence-token-dot ${status}` } /> }
      </div>
    )
  }

  _getStatus() {
    const user_id = this.props.id
    const active = _.find(this.props.presence, { user_id, status: 'active' })
    if(active) return 'active'
    const absent = _.find(this.props.presence, { user_id, status: 'absent' })
    return absent ? 'absent' : null
  }

}

const mapStateToProps = (state, props) => ({
  presence: state.maha.presence.presence
})

export default connect(mapStateToProps)(Token)
