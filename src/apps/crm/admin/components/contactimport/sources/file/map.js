import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Map extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        map
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Map Columns',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Next', handler: this._handleDone }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Map
