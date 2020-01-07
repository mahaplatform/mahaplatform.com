import { Infinite, Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Contacts extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    endpoint: PropTypes.string,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  state = {
    conatcts: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Import Contacts',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Import', handler: this._handleDone }
      ]
    }
  }

  _getInfinite() {
    const { endpoint } = this.props
    const empty = {
      icon: 'user',
      title: 'No Contacts',
      text: 'There are no contacts available'
    }
    return {
      endpoint,
      layout: Results,
      empty: <Message {...empty} />
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Contacts
