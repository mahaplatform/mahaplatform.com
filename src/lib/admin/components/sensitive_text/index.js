import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'

class SensitiveText extends React.PureComponent {

  static propTypes = {
    text: PropTypes.string
  }

  state = {
    visible: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    return (
      <div className="sensitive">
        { this._getText() }
        (<Button { ...this._getToggle() } />)
      </div>
    )
  }

  _getText() {
    const { text } = this.props
    const { visible } = this.state
    return visible ? text : text.split('').map(letter => '*').join('')
  }

  _getToggle() {
    const { visible } = this.state
    return {
      label: visible ? 'hide' : 'show',
      className: 'link',
      handler: this._handleToggle
    }
  }

  _handleToggle() {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

}

export default SensitiveText
