import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'
import _ from 'lodash'

class Main extends React.PureComponent {

  static propTypes = {
    busy: PropTypes.array,
    buttons: PropTypes.array,
    data: PropTypes.object,
    cancelIcon: PropTypes.string,
    cancelText: PropTypes.string,
    errors: PropTypes.object,
    fields: PropTypes.array,
    isBusy: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    ready: PropTypes.array,
    saveButton: PropTypes.string,
    saveIcon: PropTypes.string,
    saveText: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
    validated: PropTypes.array,
    onCancel: PropTypes.func,
    onSetBusy: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetValid: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func,
    onValidate: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)

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

  _getButtons() {
    const { saveButton } = this.props
    const handler = this._handleSave
    const buttons = []
    if(saveButton) buttons.push({ label: saveButton, color: 'red', handler })
    return buttons.length > 0 ? buttons : null
  }

  _getCancel() {
    const { cancelIcon, cancelText } = this.props
    const handler = this._handleCancel
    if(cancelIcon) return [{ icon: cancelIcon, handler }]
    if(cancelText) return [{ label: cancelText, handler }]
    return null
  }

  _getField(field) {
    const { data, errors, status } = this.props
    const { name } = field
    return {
      defaultValue: _.get(data, name),
      error: errors[name],
      field,
      status,
      onChange: this._handleChange.bind(this, name),
      onReady: this._handleSetReady.bind(this, name),
      onValid: this._handleSetValid.bind(this, name)
    }
  }

  _getPanel() {
    const { title } = this.props
    return {
      buttons: this._getButtons(),
      title,
      leftItems: this._getCancel(),
      rightItems: this._getSave()
    }
  }

  _getSave() {
    const { saveIcon, saveText } = this.props
    const handler = this._handleSave
    if(saveIcon) return [{ icon: saveIcon, handler }]
    if(saveText) return [{ label: saveText, handler }]
    return null
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(name, value) {
    this.props.onUpdate(name, value)
  }

  _handleSave() {
    this.props.onValidate()
  }

  _handleSetReady(name) {
    this.props.onSetReady(name)
  }

  _handleSetValid(name, value, errors) {
    this.props.onSetValid(name, value, errors)
  }

}

export default Main
