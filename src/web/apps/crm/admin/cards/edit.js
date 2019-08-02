import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    const { changes } = activity.data
    return (
      <div className="crm-timeline-item-card-edit">
        { changes.map((change, index) => (
          <div key={`change_${index}`}>
            { change.action === 'added' &&
              <span>Added { change.field }: { change.value }</span>
            }
            { change.action === 'changed' &&
              <span>Changed { change.field }: { change.was } &rarr; { change.value }</span>
            }
          </div>
        ))}
      </div>
    )
  }

}

export default Edit
