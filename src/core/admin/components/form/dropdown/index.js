import Token from '../../../tokens/token'
import PropTypes from 'prop-types'
import Dropdown from './dropdown'
import React from 'react'
import _ from 'lodash'

class DropdownContainer extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.any,
    endpoint: PropTypes.string,
    format: PropTypes.any,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Select an option...',
    format: Token,
    text: 'text',
    value: 'value',
    options: [],
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    options: null
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <Dropdown { ...this._getDropdown() } />
    )
  }

  componentDidMount() {
    const { endpoint } = this.props
    if(endpoint) return this._handleFetch()
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { endpoint } = this.props
    const { options } = this.state
    if(!_.isEqual(endpoint, prevProps.endpoint)) {
      this._handleFetch()
    }
    if(!_.isEqual(options, prevState.options)) {
      this.props.onReady()
    }
  }

  _getDropdown() {
    return {
      ...this.props,
      options: this._getOptions(),
      onReady: () => {}
    }
  }

  _getOptions() {
    return this.state.options || this.props.options
  }

  _handleFetch() {
    const { endpoint } = this.props
    this.context.network.request({
      endpoint,
      method: 'get',
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      options: data
    })
  }

}

export default DropdownContainer
