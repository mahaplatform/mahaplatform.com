import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class HiddenField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    format: PropTypes.object,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleChange = _.debounce(this._handleChange.bind(this), 250, { leading: true })

  render() {
    return <div className="maha-hidden-field" />
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        value: defaultValue
      })
    }
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleValidate() {
    const { value } = this.state
    this.props.onValidate(value)
  }

}

export default HiddenField
