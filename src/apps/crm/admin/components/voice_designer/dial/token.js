import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Token extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    user_id: PropTypes.number,
    number: PropTypes.string
  }

  state = {
    user: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { number } = this.props
    const { user } = this.state
    return (
      <div>
        { number &&
          <div>{ number }</div>
        }
        { user &&
          <div>
            { user.full_name }<br />
            { user.cell_phone }
          </div>
        }
      </div>
    )

  }

  componentDidMount() {
    const { user_id } = this.props
    if(user_id) this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { user_id } = this.props
    if(!_.isEqual(user_id, prevProps.user_id)) {
      this._handleFetch()
    }
  }

  _handleFetch() {
    const { user_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/users/${user_id}`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      user: data
    })
  }
}


export default Token
