import PropTypes from 'prop-types'
import React from 'react'

class Hidden extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  render() {
    return null
  }

  componentDidMount() {
    const value = this.props.value || this.props.defaultValue
    this.props.onReady()
    this.props.onChange(value)
  }

}

export default Hidden
