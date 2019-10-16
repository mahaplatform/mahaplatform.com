import PropTypes from 'prop-types'
import React from 'react'

class Speak extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box speak">
          <div className="flowchart-box-icon">
            <i className="fa fa-volume-control-phone"></i>
          </div>
          speak
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Speak
