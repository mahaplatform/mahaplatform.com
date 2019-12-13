import { Form } from 'maha-public'
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
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Credit Card',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      fields: {}
    }
  }


  _handleBack() {
    this.props.onBack()
  }

}

export default Card
