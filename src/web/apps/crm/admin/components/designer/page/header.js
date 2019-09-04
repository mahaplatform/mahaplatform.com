import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handlePop = this._handlePop.bind(this)

  render() {
    return (
      <div className="header">
        <div onClick={ this._handlePop }>back</div>
        header
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _handlePop() {
    this.props.onPop()
  }

}

export default Header
