import PropTypes from 'prop-types'
import Stack from '../stack'
import React from 'react'
import Main from './main'
import _ from 'lodash'

class Form extends React.PureComponent {

  static contextTypes = {}

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
    onChange: () => {},
    onChangeField: () => {},
    onSubmit: () => {}
  }

  state = {
    cards: []
  }

  _handlePop =  this._handlePop.bind(this)
  _handlePush =  this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Main, this._getMain.bind(this))
  }

  componentDidUpdate(prevProps) {
    const { data, isValid } = this.props
    if(isValid !== prevProps.isValid && isValid) {
      this._handleSubmit()
    }
    if(!_.isEqual(data, prevProps.data)) {
      this._handleChange(prevProps.data, data)
    }
  }

  _getMain() {
    return this.props
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleChange(previous, current) {
    const { onChangeField, onChange } = this.props
    Object.keys(current).map(name => {
      if(previous[name] != current[name]) onChangeField(name, current[name])
    })
    if(onChange) onChange(current)
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
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

  _handleSubmit() {
    const { data } = this.props
    this.props.onSubmit(data)
  }

}

export default Form
