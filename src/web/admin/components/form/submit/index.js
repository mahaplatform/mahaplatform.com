import PropTypes from 'prop-types'
import Button from '../../button'
import React from 'react'

class Submit extends React.Component {

  static propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    color: 'blue',
    text: 'Submit',
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Button { ...this._getButton() } />
  }

  _getButton() {
    const { color, text } = this.props
    return {
      color,
      label: text,
      handler: this._handleSubmit
    }
  }

  _handleSubmit() {
    this.props.onSubmit()
  }

}

export default Submit
