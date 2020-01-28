import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    options: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { options } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-contactfield-options">
          { options.map((option, index) => (
            <div key={`option_${index}`} className="maha-contactfield-option" onClick={ this._handleChoose.bind(this, option)}>
              { option.label }
            </div>
          )) }
        </div>
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

  _handleChoose(field) {
    this.props.onChoose(field.name)
    this.context.form.pop()
  }

}

export default Chooser
