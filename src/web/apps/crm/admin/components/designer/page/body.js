import PropTypes from 'prop-types'
import React from 'react'

class Body extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handlePop = this._handlePop.bind(this)

  render() {
    return (
      <div className="body">
        <div onClick={ this._handlePop }>back</div>
        body
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _handlePop() {
    this.props.onPop()
  }

}

export default Body
