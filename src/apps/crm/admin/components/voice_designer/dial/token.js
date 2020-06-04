import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Token extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    recipients: PropTypes.array,
    strategy: PropTypes.string
  }

  state = {
    users: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { recipients } = this.props
    return (
      <div>
        { recipients.map((recipient, index) => (
          <div key={`recipient_${index}`}>
            { recipient.number &&
              <div>{ recipient.number }</div>
            }
            { recipient.user_id &&
              <div>
                { this._getUser(recipient.user_id) }
              </div>
            }
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    const user_ids = this._getUserIds()
    if(user_ids.length > 0) this._handleFetch(user_ids)
  }

  _getUserIds() {
    const { recipients } = this.props
    return recipients.filter(recipient => {
      return recipient.strategy !== 'number'
    }).map(recipient => recipient.user_id)
  }

  _getUser(id) {
    const { users } = this.state
    const user = _.find(users, { id })
    return user ? user.full_name : null
  }

  _handleFetch(user_ids) {
    this.context.network.request({
      endpoint: '/api/admin/users',
      query: {
        $filter: {
          id: {
            $in: user_ids
          }
        }
      },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      users: data
    })
  }

}

export default Token
