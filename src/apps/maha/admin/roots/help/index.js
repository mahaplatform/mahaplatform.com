import Help from '../../components/help'
import PropTypes from 'prop-types'
import React from 'react'

class HelpRoot extends React.Component {

  static childContextTypes = {
    help: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  state = {
    open: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { open } = this.state
    return (
      <div className="maha-help">
        <div className="maha-help-main">
          { this.props.children }
        </div>
        { open &&
          <div className="maha-help-sidebar">
            <Help />
          </div>
        }
      </div>
    )
  }

  getChildContext() {
    return {
      help: {
        toggle: this._handleToggle
      }
    }
  }

  _handleToggle() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

}

export default HelpRoot
