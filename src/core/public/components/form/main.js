import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Main extends React.PureComponent {

  static propTypes = {
    cancelIcon: PropTypes.string,
    cancelText: PropTypes.string,
    saveIcon: PropTypes.string,
    saveText: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        form
      </ModalPanel>
    )
  }

  _getCancel() {
    const { cancelIcon, cancelText } = this.props
    const handler = this._handleCancel
    if(cancelIcon) return [{ icon: cancelIcon, handler }]
    if(cancelText) return [{ label: cancelText, handler }]
    return null
  }

  _getPanel() {
    const { title } = this.props
    return {
      title,
      leftItems: this._getCancel(),
      rightItems: this._getSave()
    }
  }

  _getSave() {
    const { saveIcon, saveText } = this.props
    const handler = () => {}
    if(saveIcon) return [{ icon: saveIcon, handler }]
    if(saveText) return [{ label: saveText, handler }]
    return null
  }

  _handleCancel() {
    this.props.onCancel()
  }

}

export default Main
