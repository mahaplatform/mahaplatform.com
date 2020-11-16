import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class List extends React.Component {

  static contextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string
  }

  render() {
    return (
      <div className="" onClick={ this._handleAddQualtricsAccount.bind(this)}>
        Add Qualtrics Account
      </div>
    )
  }

  _handleAddQualtricsAccount() {
    const { host } = this.context
    const { token } = this.props
    const timestamp = moment().format('x')

    host.openWindow(`${process.env.WEB_HOST}/admin/oauth/qualtrics/authorize?type=surveys&timestamp=${timestamp}&token=${token}`)
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(List)
