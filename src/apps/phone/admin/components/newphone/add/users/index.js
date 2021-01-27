import { Infinite, Searchbox } from '@admin'
import PropTypes from 'prop-types'
import Results from './results'
import User from './user'
import React from 'react'

class Users extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleQuery = this._handleQuery.bind(this)

  render() {
    return (
      <div className="maha-phone-search">
        <div className="maha-phone-search-header">
          <Searchbox { ...this._getSearchBox() } />
        </div>
        <div className="maha-phone-search-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { q } = this.state
    return {
      endpoint: '/api/admin/users',
      filter: {
        ...q.length > 0 ? { q } : {}
      },
      layout: Results,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _getSearchBox() {
    return {
      onChange: this._handleQuery
    }
  }

  _getUser(user) {
    const { program, onPop, onPush } = this.props
    return {
      program,
      user_id: user.id,
      onPop,
      onPush
    }
  }

  _handleChoose(user) {
    this.props.onPush(User, this._getUser(user))
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Users
