import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        chooser
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Field',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

}

export default Chooser
