import { Infinite, Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import Configure from './configure'
import React from 'react'

class Google extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    source: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  state = {
    conatcts: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleUpdateSelected = this._handleUpdateSelected.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Import from Gmail',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Next', handler: this._handleDone }
      ]
    }
  }

  _getConfigure() {
    const { onPop, onPush } = this.props
    const { contacts } = this.state
    return {
      contacts,
      onPop,
      onPush
    }
  }

  _handleDone() {
    this.props.onPush(Configure, this._getConfigure())
  }

  _getInfinite() {
    const { source } = this.props
    const empty = {
      icon: 'user',
      title: 'No Contacts',
      text: 'There are no contacts available'
    }
    return {
      endpoint: `/api/admin/profiles/${source.id}/contacts`,
      layout: Contacts,
      empty: <Message {...empty} />,
      onUpdateSelected: this._handleUpdateSelected,
      props: {
        selectable: true
      }
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleUpdateSelected(contacts) {
    this.setState({ contacts })
  }

}

export default Google
