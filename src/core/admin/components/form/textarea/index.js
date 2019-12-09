import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextArea extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    tabIndex: PropTypes.number,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: '',
    disabled: false,
    maxLength: null,
    placeholder: '',
    rows: 5,
    tabIndex: 0,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleUpdate = this._handleUpdate.bind(this)
  _handleChange = _.throttle(this._handleChange.bind(this), 250, { trailing:  true })

  render() {
    const { value } = this.state
    const { maxLength } = this.props
    return (
      <div className="maha-textarea">
        { maxLength &&
          <div className={ this._getMaxClass() }>
            { value.length } / { maxLength }
          </div>
        }
        <textarea { ...this._getTextarea() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      value: _.toString(defaultValue)
    })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.defaultValue !== prevProps.defaultValue) {
      this.props.onChange(this.state.value )
    }
    if(this.state.value !== prevState.value) {
      this._handleChange()
    }
  }

  _getMaxClass() {
    const { value } = this.state
    const { maxLength } = this.props
    const classes = ['maha-textarea-length']
    if(value.length >= maxLength) classes.push('max')
    return classes.join(' ')
  }

  _getTextarea() {
    const { placeholder, disabled, rows, tabIndex } = this.props
    const { value } = this.state
    return {
      placeholder,
      disabled,
      value,
      rows,
      tabIndex,
      onChange: this._handleUpdate
    }
  }

  _handleChange() {
    this.props.onChange(this.state.value )
  }

  _handleUpdate(e) {
    this.setValue(e.target.value)
  }

  setValue(value) {
    if(this.props.maxLength && value.length > this.props.maxLength) return
    this.setState({ value })
  }

}

export default TextArea
