import { UserToken, ModalPanel, ToggleList } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Subscriptions extends React.Component {

  static propTypes = {
    channel: PropTypes.object,
    endpoint: PropTypes.string,
    ids: PropTypes.array,
    method: PropTypes.string,
    saveText: PropTypes.string,
    status: PropTypes.string,
    subscription_ids: PropTypes.array,
    title: PropTypes.string,
    user_id: PropTypes.number,
    onCancel: PropTypes.func,
    onDone: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <ToggleList { ...this._getToggleList() } />
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { channel, status, onDone } = this.props
    if(status !== prevProps.status && status === 'success') {
      onDone(channel)
    }
  }

  _getPanel() {
    const { saveText, title } = this.props
    return {
      title,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: saveText, handler: this._handleSave }
      ]
    }
  }

  _getToggleList() {
    const { subscription_ids, user_id } = this.props
    const exclude_ids = [ user_id]
    return {
      endpoint: '/api/admin/users',
      defaultFilters: { app_id: { $eq: 6 } },
      defaultValue: subscription_ids,
      exclude_ids,
      format: (props) => <UserToken { ...props } presence={ true} />,
      multiple: true,
      text: 'full_name',
      value: 'id',
      onChange: this._handleChange
    }
  }

  _handleChange(ids) {
    this.props.onSet(ids)
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleSave() {
    const { endpoint, ids, method } = this.props
    this.props.onSave(endpoint, method, ids)
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Subscriptions)
