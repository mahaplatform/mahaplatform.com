import { AssetToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class File extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    return (
      <div className="crm-timeline-item-card-file">
        <AssetToken { ...activity.data } />
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default File
