import ModalPanel from '../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Sections from './sections'
import Menu from '../menu'
import React from 'react'

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
    inline: PropTypes.bool,
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
    validated: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onChangeField: PropTypes.func,
    onFailure: PropTypes.func,
    onFetch: PropTypes.func,
    onSetBusy: PropTypes.func,
    onSetData: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValid: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitForm: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdateData: PropTypes.func,
    onValidate: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

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
            <Menu { ...this._getMenu() } />
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

  _getCancel() {
    const { cancelIcon, cancelText } = this.props
    const handler = this._handleCancel
    if(cancelIcon) return [{ icon: cancelIcon, handler }]
    if(cancelText) return [{ label: cancelText, handler }]
    return null
  }

  _getFormClasses() {
    const { isConfiguring, isReady, status } = this.props
    const classes = ['ui','form',status]
    if(isConfiguring || !isReady || status === 'submitting') classes.push('loading')
    return classes.join(' ')
  }

  _getMenu() {
    const { tabs } = this.props
    return {
      items: tabs.map(tab => ({
        label: tab.label,
        component: <Sections { ...this._getSections(tab.sections) } />
      }))
    }
  }

  _getPanel() {
    const { buttons, color, inline, showHeader, title } = this.props
    return {
      buttons,
      color,
      showHeader: showHeader && !inline,
      title,
      leftItems: this._getCancel(),
      rightItems: this._getSave()
    }
  }

  _getSections(sections) {
    const { data, errors, status, onSetBusy, onSetReady, onSetValid, onUpdateData, onValidate } = this.props
    return {
      data,
      errors,
      sections,
      status,
      onBusy: onSetBusy,
      onReady: onSetReady,
      onSubmit: onValidate,
      onUpdateData,
      onValid: onSetValid
    }
  }

  _getSave() {
    const { isBusy, saveIcon, saveText, onValidate } = this.props
    if(isBusy) return null
    const handler = onValidate
    if(saveIcon) return [{ icon: saveIcon, handler }]
    if(saveText) return [{ label: saveText, handler }]
    return null
  }

  _handleCancel() {
    this.props.onCancel()
  }

}

const mapStateToProps = (state, props) => ({
  ...state.maha.form[props.cid]
})

export default connect(mapStateToProps)(Main)
