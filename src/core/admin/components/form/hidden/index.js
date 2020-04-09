import PropTypes from 'prop-types'
import React from 'react'

class Hidden extends React.Component {

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  render() {
    return null
  }

  componentDidMount() {
    const { value } = this.props
    this.props.onReady()
    this.props.onChange(value)
  }

}

export default Hidden
