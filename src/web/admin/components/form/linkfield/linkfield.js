import PropTypes from 'prop-types'
import React from 'react'

class Linkfield extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    return (
      <div className="linkfield">
      linkfield
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {}


}

export default Linkfield
