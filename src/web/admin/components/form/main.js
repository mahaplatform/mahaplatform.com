import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Sections from './sections'
import Menu from '../menu'
import React from 'react'
import _ from 'lodash'

class Main extends React.Component {

  static propTypes = {
    action: PropTypes.string,
    after: PropTypes.string,
    before: PropTypes.any,
    busy: PropTypes.array,
    buttons: PropTypes.array,
    defaults: PropTypes.object,
    cancelIcon: PropTypes.string,
    cancelText: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.object,
    errors: PropTypes.object,
    endpoint: PropTypes.string,
    entity: PropTypes.any,
    filtered: PropTypes.object,
    instructions: PropTypes.any,
    isConfiguring: PropTypes.bool,
    isReady: PropTypes.bool,
    isBusy: PropTypes.bool,
    isValid: PropTypes.bool,
    method: PropTypes.string,
    ready: PropTypes.array,
    saveIcon: PropTypes.string,
    saveText: PropTypes.string,
    showHeader: PropTypes.bool,
    sections: PropTypes.array,
    status: PropTypes.string,
    tabs: PropTypes.array,
    title: PropTypes.string,
    validateResults: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onChangeField: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitForm: PropTypes.func,
    onFailure: PropTypes.func,
    onFetchData: PropTypes.func,
    onSetData: PropTypes.func,
    onSetReady: PropTypes.func,
    onSuccess: PropTypes.func,
    onToggleBusy: PropTypes.func,
    onUpdateData: PropTypes.func,
    onValidateForm: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _debouncedSubmit = _.debounce(this._handleSubmit.bind(this), 2500, { leading: true })
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { after, before, isConfiguring, instructions, sections, tabs } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className={ this._getFormClasses() }>
          { (before || instructions) &&
            <div className="maha-form-header">
              { before && <div className="maha-form-before">{ before }</div> }
              { instructions && <div className="instructions">{ instructions }</div> }
            </div>
          }
          { !isConfiguring && sections &&
            <Sections { ...this._getSections(sections) } />
          }
          { !isConfiguring && tabs &&
            <Menu { ...this._getTabs() } />
          }
          { after &&
            <div className="maha-form-footer">
              <div className="maha-form-after">{ after }</div>
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  _getButtonClasses() {
    const { isBusy } = this.props
    const classes = ['maha-modal-panel-header-navigation']
    if(isBusy) classes.push('disabled')
    return classes.join(' ')
  }

  _getFormClasses() {
    const { isConfiguring, isReady, status } = this.props
    const classes = ['ui','form',status]
    if(isConfiguring || !isReady || status === 'submitting') classes.push('loading')
    return classes.join(' ')
  }

  _getCancel() {
    const { cancelIcon, cancelText } = this.props
    const handler = this._handleCancel
    if(cancelIcon) return [{ icon: cancelIcon, handler }]
    if(cancelText) return [{ label: cancelText, handler }]
    return null
  }

  _getSave() {
    const { saveIcon, saveText } = this.props
    const handler = this._debouncedSubmit
    if(saveIcon) return [{ icon: saveIcon, handler }]
    if(saveText) return [{ label: saveText, handler }]
    return null
  }

  _getPanel() {
    const { buttons, color, showHeader, title } = this.props
    return {
      buttons,
      color,
      showHeader,
      title,
      leftItems: this._getCancel(),
      rightItems: this._getSave()
    }
  }

  _getSections(sections) {
    const { data, errors, onSetReady, onToggleBusy, onUpdateData } = this.props
    return {
      sections,
      data,
      errors,
      onBusy: onToggleBusy,
      onReady: onSetReady,
      onUpdateData
    }
  }

  _getTabs() {
    const { tabs } = this.props
    return {
      items: tabs.map(tab => ({
        label: tab.label,
        component: <Sections { ...this._getSections(tab.sections) } />
      }))
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleFailure() {
    this.props.onFailure()
  }

  _handleSubmit() {
    const { action, filtered, isBusy, isValid, method, onSubmit, onSubmitForm, onValidateForm, validateResults } = this.props
    if(isBusy) return
    if(!isValid) return onValidateForm(validateResults)
    if(action) return onSubmitForm(method, action, filtered)
    if(onSubmit) {
      if(onSubmit(filtered)) return this._handleSuccess()
      return this._handleFailure()
    }
    this._handleSuccess()
  }

  _handleSuccess() {
    this.props.onSuccess(this.props.entity)
  }

}

export default Main
