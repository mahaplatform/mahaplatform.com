import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Token extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    body: PropTypes.string,
    subject: PropTypes.string,
    email: PropTypes.string,
    user_id: PropTypes.number
  }

  state = {
    user: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { email, subject } = this.props
    const { user } = this.state
    return (
      <div>
        { user &&
          <div>
            To { user.full_name }
          </div>
        }
        { email &&
          <div>
            To { email }
          </div>
        }
        { subject &&
          <div>
            &quot;{ subject }&quot;
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
