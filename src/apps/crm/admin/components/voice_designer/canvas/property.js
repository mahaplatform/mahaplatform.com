import PropTypes from 'prop-types'
import React from 'react'

class List extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string
  }

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-property">
          <div className="flowchart-box-icon">
            <i className="fa fa-user" />
          </div>
          <div className="flowchart-box-label">
            Update Property
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default List
