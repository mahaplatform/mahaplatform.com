import PropTypes from 'prop-types'
import React from 'react'

class List extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { action } = this.props
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-list">
          <div className="flowchart-box-icon">
            <i className="fa fa-users" />
          </div>
          <div className="flowchart-box-label">
            { action === 'add' ? 'add to list' : 'remove from list' }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default List
