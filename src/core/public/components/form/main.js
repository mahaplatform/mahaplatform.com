import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'

class Main extends React.PureComponent {

  static propTypes = {
    cancelIcon: PropTypes.string,
    cancelText: PropTypes.string,
    fields: PropTypes.array,
    saveIcon: PropTypes.string,
    saveText: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { fields } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-form">
          <div className="ui form">
            { fields.map((field, index) => (
              <Field key={`field_${index}`} { ...this._getField(field) } />
            )) }
          </div>
        </div>
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

  _getField(field) {
    // const { errors, status } = this.props
    return {
      field,
      // error: errors[field.name],
      // status: status[field.name],
      // onChange: this._handleChange.bind(this, field.name),
      // onReady: this.onSetStatus.bind(this, field.name, 'ready'),
      // onValidate: this._handleSetValidate.bind(this, field.name),
      // onFinalize: this._handleSetFinalized.bind(this, field.name)
    }
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
