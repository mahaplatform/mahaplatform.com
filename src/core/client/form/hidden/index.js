import PropTypes from 'prop-types'
import React from 'react'

class Hidden extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    format: PropTypes.object,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    return null
  }

  componentDidMount() {
    this.props.onReady()
    this.props.onChange(this.props.value)
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'validating') {
        this.props.onChange(this.props.value)
      }
    }
  }

}

export default Hidden
