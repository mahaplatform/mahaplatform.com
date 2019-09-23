import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Crop extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        Crop
      </ModalPanel>
    )
  }


  _getPanel() {
    return {
      title: 'Crop / Resize',
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleAdjust(key, value) {
    this.props.onAdjust(key, value)
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default Crop
