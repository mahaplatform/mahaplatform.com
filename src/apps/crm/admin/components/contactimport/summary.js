import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Summary extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    contacts: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        { this.props.contacts.length } selected contacts
      </ModalPanel>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getPanel() {
    return {
      title: 'Validate',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleDone() {}

  _handleCancel() {
    this.props.onPop()
  }


}

export default Summary
