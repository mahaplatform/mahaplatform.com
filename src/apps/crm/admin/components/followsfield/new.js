import { ModalPanel, PickList } from 'maha-admin'
import ServiceToken from '../../tokens/service'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    options: PropTypes.array,
    onAdd: PropTypes.func,
    onBack: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <PickList { ...this._getPickList() } />
      </ModalPanel>
    )
  }

  _getPickList() {
    const { options } = this.props
    return {
      options,
      onChoose: this._handleChoose,
      format: ServiceToken
    }
  }

  _getPanel() {
    return {
      title: 'Choose Service',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(service) {
    this.props.onAdd(service)
  }

}

export default New
