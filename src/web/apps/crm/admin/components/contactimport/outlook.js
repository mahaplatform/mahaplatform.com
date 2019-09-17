import { Infinite, Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import React from 'react'

class Outlook extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    source: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getPanel() {
    return {
      title: 'Import from Outlook',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
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
      props: {}
    }
  }

  _handleCancel() {
    this.props.onPop()
  }


}

export default Outlook
