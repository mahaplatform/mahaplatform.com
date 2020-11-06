import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import List from '../../list'
import React from 'react'

class PhoneNumbers extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <List { ...this._getList() } />
      </ModalPanel>
    )
  }

  _getList() {
    const { contact } = this.props
    return {
      format: (phone_number) => (
        <div className="token">
          { phone_number.number }
        </div>
      ),
      items: contact.phone_numbers.filter(phone_number => {
        return phone_number.can_text
      }),
      handler: this._handleChoose
    }
  }

  _getPanel() {
    return {
      title: 'Choose a Phone Number',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(program) {
    this.props.onChoose(program)
  }

}

export default PhoneNumbers
