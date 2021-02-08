import PropTypes from 'prop-types'
import { Button } from '@admin'
import User from './user'
import React from 'react'
import _ from 'lodash'

class UserField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    required: PropTypes.bool,
    users: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    users: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const users = this.state.users.map((user, index) => {
      return {
        ...this._getUser(user.user_id),
        index
      }
    })
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { users.sort((a,b) => {
            return a.last_name > b.last_name ? 1 : -1
          }).map((user, index) => (
            <div className="crm-recipientsfield-recipient" key={`user_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                <span className="crm-recipientsfield-recipient-extension">
                  { user.last_name.toUpperCase().substr(0, 3) }
                </span>
                { user.full_name }
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleEdit.bind(this, user.index)}>
                <i className="fa fa-pencil" />
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleRemove.bind(this, user.index)}>
                <i className="fa fa-times" />
              </div>
            </div>
          ))}
          <div className="crm-recipientsfield-recipients-add">
            <Button { ...this._getAdd() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      users: defaultValue
    })
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { users } = this.state
    if(!_.isEqual(users, prevState.users)) {
      this.props.onChange(users)
    }
  }

  _getAdd() {
    return {
      label: 'Add Recipient',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getNew() {
    return {
      mode: 'new',
      onDone: this._handleCreate
    }
  }

  _getEdit(index) {
    const user = this.state.users[index]
    return {
      user,
      mode: 'edit',
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _getUser(id) {
    const { users } = this.props
    const user = _.find(users, { id })
    return user
  }

  _handleAdd() {
    this.context.form.push(User, this._getNew())
  }

  _handleCreate(user) {
    const { users } = this.state
    this.setState({
      users: [
        ...users,
        user
      ]
    })
  }

  _handleEdit(index) {
    this.context.form.push(User, this._getEdit(index))
  }

  _handleRemove(remove) {
    const { users } = this.state
    this.setState({
      users: users.filter((user, index) => {
        return index !== remove
      })
    })
  }

  _handleUpdate(i, updated) {
    const { users } = this.state
    this.setState({
      users: users.map((user, index) => {
        return index === i ? updated : user
      })
    })
  }

  _handleValidate() {
    const { users } = this.state
    const { required, onValid } = this.props
    if(required && (!users || users.length === 0)) {
      return onValid(null, ['You must add at least 1 recipient'])
    }
    onValid(users)
  }

}

export default UserField
