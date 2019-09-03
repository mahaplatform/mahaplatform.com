import PropTypes from 'prop-types'
import React from 'react'

class Page extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handlePop = this._handlePop.bind(this)

  render() {
    return (
      <div className="page">
        <div onClick={ this._handlePop }>back</div>
        page
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _handlePop() {
    this.props.onPop()
  }

}

export default Page
