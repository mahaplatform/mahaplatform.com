import PropTypes from 'prop-types'
import Stack from '../stack'
import Main from './main'
import React from 'react'

class MultiForm extends React.Component {

  static childContextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    endpoint: PropTypes.string,
    formdata: PropTypes.object,
    formatData: PropTypes.func,
    getSteps: PropTypes.func,
    method: PropTypes.string,
    status: PropTypes.string,
    step: PropTypes.number,
    title: PropTypes.string,
    props: PropTypes.object,
    onCancel: PropTypes.func,
    onFetch: PropTypes.func,
    onSave: PropTypes.func,
    onSetData: PropTypes.func,
    onSetStep: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  static defaultProps = {
    formatData: (data) => data,
    method: 'post',
    steps: [],
    title: 'Form'
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    const { endpoint } = this.props
    if(endpoint) this.props.onFetch(endpoint)
    if(!endpoint) this.props.onSetData({})
    this._handlePush(Main, this._getMain.bind(this))
  }

  componentDidUpdate(prevProps) {
    const { formdata, status } = this.props
    if(status !== prevProps.status && status === 'success') {
      console.log('here')
      this.props.onSuccess(formdata)
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

  _getMain() {
    const { action, endpoint, formdata, formatData, getSteps, method, props, status, step, title, onCancel, onSave, onSetStep, onSuccess, onUpdateData } = this.props
    return {
      action,
      endpoint,
      formdata,
      formatData,
      getSteps,
      method,
      props,
      status,
      step,
      title,
      onCancel,
      onSave,
      onSetStep,
      onSuccess,
      onUpdateData
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
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

}

export default MultiForm
