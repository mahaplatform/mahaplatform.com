import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Sections from './sections'
import Menu from '../menu'
import React from 'react'
import _ from 'lodash'

class Form extends React.Component {

  static childContextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    after: PropTypes.string,
    before: PropTypes.any,
    busy: PropTypes.array,
    buttonPosition: PropTypes.string,
    defaults: PropTypes.object,
    cancelText: PropTypes.any,
    config: PropTypes.array,
    data: PropTypes.object,
    errors: PropTypes.object,
    endpoint: PropTypes.string,
    entity: PropTypes.any,
    fields: PropTypes.array,
    filtered: PropTypes.object,
    instructions: PropTypes.any,
    isReady: PropTypes.bool,
    isBusy: PropTypes.bool,
    isValid: PropTypes.bool,
    method: PropTypes.string,
    panels: PropTypes.array,
    ready: PropTypes.array,
    saveText: PropTypes.any,
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
    onFetchSections: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onResetForm: PropTypes.func,
    onSetData: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetSections: PropTypes.func,
    onSuccess: PropTypes.func,
    onToggleBusy: PropTypes.func,
    onUpdateData: PropTypes.func,
    onUpdateSections: PropTypes.func,
    onValidateForm: PropTypes.func
  }

  static defaultProps = {
    method: 'GET',
    buttonPosition: 'top',
    cancelText: 'Cancel',
    saveText: 'Save',
    showHeader: true,
    onCancel: () => {},
    onChange: () => {},
    onChangeField: () => {},
    onSubmit: () => {},
    onFailure: (error) => {},
    onSuccess: (entity) => {}
  }

  form = null

  _handleCancel = this._handleCancel.bind(this)
  _debouncedSubmit = _.debounce(this._handleSubmit.bind(this), 2500, { leading: true })
  _handleToggleBusy = this._handleToggleBusy.bind(this)
  _handleSetReady = this._handleSetReady.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleUpdateData = this._handleUpdateData.bind(this)

  render() {
    const { after, before, config, instructions, panels, status, tabs } = this.props
    const configuring = _.includes(['pending', 'loading_sections','sections_loaded', 'loading_data'], status)
    return (
      <div className="maha-form">
        <ModalPanel { ...this._getPanel() }>
          <div className={ this._getFormClasses() } ref={ node => this.form = node }>
            { (before || instructions) &&
              <div className="maha-form-header">
                { before && <div className="maha-form-before">{ before }</div> }
                { instructions && <div className="instructions">{ instructions }</div> }
              </div>
            }
            { !configuring && config &&
              <Sections { ...this._getSections(config) } />
            }
            { !configuring && tabs &&
              <Menu { ...this._getTabs() } />
            }
            { after &&
              <div className="maha-form-footer">
                <div className="maha-form-after">{ after }</div>
              </div>
            }
          </div>
        </ModalPanel>
        <div className="maha-form-panels">
          <TransitionGroup>
            { panels.map((panel, index) => (
              <CSSTransition classNames="stack" timeout={ 250 } key={ `panel_${index}` }>
                <div>
                  { _.isFunction(panel) ? React.createElement(panel) : panel }
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { sections, onSetSections } = this.props
    if(sections) return onSetSections(sections)
    this._handleLoadData()
  }

  componentDidUpdate(prevProps) {
    const { data, sections, status } = this.props
    if(!_.isEqual(prevProps.sections, sections)) {
      this._handleUpdateSections()
    }
    if(prevProps.status !== status) {
      if(status === 'sections_loaded') this._handleLoadData()
      if(status === 'validated') this._handleSubmit()
      if(status === 'success') this._handleSuccess()
      if(status === 'failure') this._handleFailure()
    }
    if(!_.isEqual(prevProps.data, data)) {
      this._handleChange(prevProps.data, data)
    }
  }

  getChildContext() {
    return {
      form: {
        push: this._handlePush.bind(this),
        pop: this._handlePop.bind(this)
      }
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

  _getPanel() {
    const { buttonPosition, cancelText, saveText, showHeader, title } = this.props
    return {
      position: buttonPosition,
      showHeader,
      title,
      leftItems: (cancelText) ? [
        { label: cancelText, handler: this._handleCancel }
      ] : null,
      rightItems: (saveText) ? [
        { label: saveText, handler: this._debouncedSubmit , className: this._getButtonClasses() }
      ] : null
    }
  }

  _getFormClasses() {
    const { isReady, status } = this.props
    const configuring = _.includes(['pending', 'loading_sections','sections_loaded', 'loading_data'], status)
    const submitting = status === 'submitting'
    let classes = ['ui', 'form', status]
    if(configuring || !isReady || submitting) classes.push('loading')
    return classes.join(' ')
  }

  _getButtonClasses() {
    const { isBusy } = this.props
    let saveClasses = ['maha-modal-panel-header-navigation']
    if(isBusy) saveClasses.push('disabled')
    return saveClasses.join(' ')
  }

  _getSections(sections) {
    const { data, errors } = this.props
    return {
      sections,
      data,
      errors,
      onBusy: this._handleToggleBusy,
      onReady: this._handleSetReady,
      onSubmit: this._handleSubmit,
      onUpdateData: this._handleUpdateData
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(previous, current) {
    const { onChangeField, onChange } = this.props
    if(onChangeField) {
      _.forOwn(current, (value, code) => {
        if(previous[code] != current[code]) onChangeField(code, value)
      })
    }
    if(onChange) onChange(current)
  }

  _handleFailure() {
    this.props.onFailure()
  }

  _handleLoadData() {
    const { data, defaults, endpoint, onFetchData, onSetData } = this.props
    if(Object.keys(data).length > 1) return onSetData(data)
    if(endpoint) return onFetchData(endpoint, defaults)
    onSetData(defaults)
  }

  _handleSetReady(key) {
    this.props.onSetReady(key)
  }

  _handleToggleBusy(key) {
    this.props.onToggleBusy(key)
  }

  _handlePop(num = 1) {
    this.props.onPop(num)
  }

  _handlePush(component) {
    this.props.onPush(component)
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

  _handleUpdateData(key, value) {
    this.props.onUpdateData(key, value)
  }

  _handleUpdateSections() {
    const { sections, onUpdateSections } = this.props
    onUpdateSections(sections)
  }


}

export default Form
