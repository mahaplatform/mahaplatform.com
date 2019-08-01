import PropTypes from 'prop-types'
import React from 'react'

class Visit extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    return (
      <div className="crm-timeline-item-card-visits">
        { activity.data.map((link,index) => (
          <div className="link" key={`link_${index}`}>
            { link }
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default Visit
