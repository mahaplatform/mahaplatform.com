import { UserToken, ModalPanel, ToggleList } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chat extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    ids: PropTypes.array,
    item: PropTypes.object,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onSet: PropTypes.func,
    onShare: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleShare = this._handleShare.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <ToggleList { ...this._getToggleList() } />
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'success') {
      this._handleSuccess()
    }
  }

  _getPanel() {
    return {
      title: 'Share via Chat',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack  }
      ],
      rightItems: [
        { label: 'Share', handler: this._handleShare }
      ]
    }
  }

  _getToggleList() {
    const { admin } = this.context
    const exclude_ids = [ admin.user.id ]
    return {
      endpoint: '/api/admin/users',
      defaultFilters: { app_id: { $eq: 6 } },
      exclude_ids,
      format: (props) => <UserToken { ...props } presence={ true} />,
      multiple: true,
      text: 'full_name',
      value: 'id',
      onChange: this._handleChange
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(ids) {
    this.props.onSet(ids)
  }

  _handleShare() {
    const { ids, item } = this.props
    const asset_id = item.asset.id
    this.props.onShare({ asset_id, ids })
  }

  _handleSuccess() {
    const { item } = this.props
    setTimeout(() => {
      this.context.flash.set('success', `The ${item.type} was successfully shared`)
    }, 500)
    this.context.modal.close()
  }


}

export default Chat
