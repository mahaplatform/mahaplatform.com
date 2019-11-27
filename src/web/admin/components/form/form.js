import PropTypes from 'prop-types'
import Stack from '../stack'
import React from 'react'
import Main from './main'
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

  static defaultProps = {
    method: 'GET',
    cancelText: 'Cancel',
    color: 'red',
    saveText: 'Save',
    showHeader: true,
    onCancel: () => {},
    onChange: () => {},
    onChangeField: () => {},
    onSubmit: () => {},
    onFailure: (error) => {},
    onSuccess: (entity) => {}
  }

  state = {
    cards: []
  }

  _handleChange = this._handleChange.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="maha-form">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handleLoadData()
  }

  componentDidUpdate(prevProps) {
    const { data, status } = this.props
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
        push: this._handlePush,
        pop: this._handlePop
      }
    }
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

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
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
