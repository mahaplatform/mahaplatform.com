import PropTypes from 'prop-types'
import React from 'react'

class Preheader extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handlePop = this._handlePop.bind(this)

  render() {
    return (
      <div className="preheader">
        <div onClick={ this._handlePop }>back</div>
        preheader
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _handlePop() {
    this.props.onPop()
  }

}

export default Preheader
