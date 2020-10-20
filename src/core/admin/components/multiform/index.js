import PropTypes from 'prop-types'
import Stack from '../stack'
import Main from './main'
import React from 'react'

class MultiForm extends React.Component {

  static childContextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    endpoint: PropTypes.string,
    formatData: PropTypes.func,
    getSteps: PropTypes.func,
    method: PropTypes.string,
    title: PropTypes.string,
    props: PropTypes.object,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func
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
    this._handlePush(<Main { ...this._getMain() } />)
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
    const { endpoint, formatData, getSteps, method, props, title, onCancel, onSuccess } = this.props
    return {
      endpoint,
      formatData,
      getSteps,
      method,
      props,
      title,
      onCancel,
      onSuccess
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
