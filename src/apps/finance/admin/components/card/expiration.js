import { TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Expiration extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleChange = _.debounce(this._handleChange.bind(this), 250, { trailing: true })
  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return <TextField { ...this._getTextField() } />
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getFormatted() {
    const { value } = this.state
    const parts = Array(2).fill(0).map((iterator, index) => {
      return value.substr(index * 2, 2)
    }).filter(part => {
      return part.length > 0
    })
    return parts.join('/')
  }

  _getTextField() {
    return {
      placeholder: '10/24',
      onChange: this._handleUpdate,
      defaultValue: this._getFormatted()
    }
  }

  _handleChange() {
    const value = this._getFormatted()
    this.props.onChange(value)
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleUpdate(value) {
    this.setState({
      value: value.replace(/\D/g,'')
    })
  }

}

export default Expiration
