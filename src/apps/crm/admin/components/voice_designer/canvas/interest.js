import PropTypes from 'prop-types'
import React from 'react'

class Interest extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-interest">
          <div className="flowchart-box-icon">
            <i className="fa fa-book" />
          </div>
          <div className="flowchart-box-label">
            add interest
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Interest
