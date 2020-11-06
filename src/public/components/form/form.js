import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Control from './control'
import React from 'react'
import _ from 'lodash'

class Form extends React.PureComponent {

  static propTypes = {
    busy: PropTypes.array,
    buttons: PropTypes.array,
    data: PropTypes.object,
    cancelIcon: PropTypes.string,
    cancelText: PropTypes.string,
    errors: PropTypes.object,
    fields: PropTypes.array,
    inline: PropTypes.bool,
    isBusy: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    isValidated: PropTypes.bool,
    ready: PropTypes.array,
    reference: PropTypes.func,
    saveButton: PropTypes.string,
    saveIcon: PropTypes.string,
    saveText: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
    validated: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onChangeField: PropTypes.func,
    onSetBusy: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetValid: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    inline: false,
    reference: () => {},
    onChange: () => {},
    onChangeField: () => {},
    onSubmit: () => {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleValidate = this._handleValidate.bind(this)
  _handleValidate = _.debounce(this._handleValidate.bind(this), 2500, { leading: true })

  render() {
    const { fields } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className={ this._getClass() }>
          <div className="ui form">
            { fields.map((field, index) => (
              <Control key={`field_${index}`} { ...this._getControl(field) } />
            )) }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { reference } = this.props
    if(reference) reference({
      submit: this._handleValidate.bind(this, false)
    })
  }

  componentDidUpdate(prevProps) {
    const { data, isValid, isValidated } = this.props
    if(isValidated !== prevProps.isValidated) {
      if(isValid) this._handleSubmit()
      if(!isValid) this._handleValidate(true)
    }
    if(!_.isEqual(data, prevProps.data)) {
      this._handleChange(prevProps.data, data)
    }
  }

  _getButtons() {
    const { saveButton } = this.props
    const handler = this._handleValidate.bind(this, false)
    const buttons = []
    if(saveButton) buttons.push({ label: saveButton, color: 'blue', handler })
    return buttons.length > 0 ? buttons : null
  }

  _getCancel() {
    const { cancelIcon, cancelText } = this.props
    const handler = this._handleCancel
    if(cancelIcon) return [{ icon: cancelIcon, handler }]
    if(cancelText) return [{ label: cancelText, handler }]
    return null
  }

  _getClass() {
    const { inline  } = this.props
    const classes = ['maha-form']
    if(inline) classes.push('inline')
    return classes.join(' ')
  }

  _getControl(field) {
    const { data, errors, status, onSetBusy, onSetReady, onSetValid, onUpdate } = this.props
    return {
      data,
      errors,
      field,
      status,
      onSetBusy,
      onSetReady,
      onSetValid,
      onUpdate
    }
  }

  _getPanel() {
    const { inline, title } = this.props
    return {
      showHeader: !inline,
      buttons: this._getButtons(),
      title,
      leftItems: this._getCancel(),
      rightItems: this._getSave()
    }
  }

  _getSave() {
    const { saveIcon, saveText } = this.props
    const handler = this._handleValidate
    if(saveIcon) return [{ icon: saveIcon, handler }]
    if(saveText) return [{ label: saveText, handler }]
    return null
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(previous, current) {
    const { onChangeField, onChange } = this.props
    Object.keys(current).map(name => {
      if(previous[name] != current[name]) onChangeField(name, current[name])
    })
    if(onChange) onChange(current)
  }

  _handleSubmit() {
    const { data, onSubmit } = this.props
    onSubmit(data)
  }

  _handleValidate(reset = false) {
    const { isBusy, onValidate } = this.props
    if(!isBusy) onValidate(reset)
  }
}

export default Form
