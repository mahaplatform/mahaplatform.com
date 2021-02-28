import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@admin'

class APIKey extends React.PureComponent {

  static propTypes = {
    access_token: PropTypes.string
  }

  state = {
    visible: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    return (
      <div className="datasets-access-token">
        { this._getToken() }
        (<Button { ...this._getToggle() } />)
      </div>
    )
  }

  _getToken() {
    const { access_token } = this.props
    const { visible } = this.state
    return visible ? access_token : access_token.split('').map(letter => '*').join('')
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

export default APIKey
