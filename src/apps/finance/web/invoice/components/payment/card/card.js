import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        credit card
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'Credit Card'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default Card
