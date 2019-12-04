import PropTypes from 'prop-types'
import Stack from '../stack'
import React from 'react'
import Main from './main'
import _ from 'lodash'

class Form extends React.Component {

  static childContextTypes = {
    form: PropTypes.object
  }

  static contextTypes = {
    form: PropTypes.object
  }

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
    fields: PropTypes.any,
    fieldNames: PropTypes.any,
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
    validateResults: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onChangeField: PropTypes.func,
    onFailure: PropTypes.func,
    onFetch: PropTypes.func,
    onSetBusy: PropTypes.func,
    onSetData: PropTypes.func,
    onSetReady: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitForm: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdateData: PropTypes.func,
    onValidateForm: PropTypes.func
  }

  static defaultProps = {
    inline: false,
    method: 'GET',
    cancelText: 'Cancel',
    color: 'red',
    saveText: 'Save',
    showHeader: true,
    onCancel: () => {},
    onChange: () => {},
    onChangeField: () => {},
    onSubmit: () => {},
    onFailure: () => {},
    onSuccess: () => {}
  }

  state = {
    cards: []
  }

  _handleChange = this._handleChange.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className={ this._getClass() }>
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handleLoadData()
  }

  componentDidUpdate(prevProps) {
    const { data, fields, fieldNames, status } = this.props
    if(prevProps.status !== status) {
      if(status === 'sections_loaded') this._handleLoadData()
      if(status === 'validated') this._handleSubmit()
      if(status === 'success') this._handleSuccess()
      if(status === 'failure') this._handleFailure()
    } else if(!_.isEqual(prevProps.data, data)) {
      this._handleChange(prevProps.data, data)
    } else if(!_.isEqual(prevProps.fieldNames, fieldNames)) {
      this._handleNewFields(prevProps.fields, fields)
    }
  }

  getChildContext() {
    return {
      form: {
        push: this._handlePush,
        pop: this._handlePop
      }
    }
  }

  _getClass() {
    const { inline  } = this.props
    const classes = ['maha-form']
    if(inline) classes.push('inline')
    return classes.join(' ')
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards: [
        { component: Main, props: this._getMain.bind(this) },
        ...cards
      ],
      slideFirst: false
    }
  }

  _getMain() {
    return this.props
  }

  _handleChange(previous, current) {
    const { onChangeField, onChange } = this.props
    Object.keys(current).map(code => {
      if(previous[code] != current[code]) onChangeField(code, current[code])
    })
    if(onChange) onChange(current)
  }

  _handleFailure() {
    this.props.onFailure()
  }

  _handleLoadData() {
    const { data, defaults, endpoint, onFetch, onSetData } = this.props
    if(Object.keys(data).length > 1) return onSetData(data)
    if(endpoint) return onFetch(endpoint, defaults)
    onSetData(defaults)
  }

  _handleNewFields(previous, current) {
    const { data, onUpdateData } = this.props
    current.map(field => {
      if(data[field.name] === undefined) {
        return onUpdateData(field.name, field.defaultValue)
      }
    })
  }

  _handlePop(index = -1) {
    const { form } = this.context
    if(form) return form.pop(index)
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    const { form } = this.context
    if(form) return form.push(component, props)
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleSuccess() {
    this.props.onSuccess(this.props.entity)
  }

}

export default Form
