import PropTypes from 'prop-types'
import React from 'react'

class Footer extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handlePop = this._handlePop.bind(this)

  render() {
    return (
      <div className="footer">
        <div onClick={ this._handlePop }>back</div>
        footer
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _handlePop() {
    this.props.onPop()
  }

}

export default Footer
