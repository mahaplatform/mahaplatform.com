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
    if(!changes) return null
    return (
      <div className="crm-timeline-item-card-edit">
        <ul>
          { changes.map((change, index) => (
            <li key={`change_${index}`}>
              { change.action === 'added' &&
                <span>added { change.field }: { change.value }</span>
              }
              { change.action === 'changed' &&
                <span>changed { change.field }: { change.was } &rarr; { change.value }</span>
              }
            </li>
          ))}
        </ul>
      </div>
    )
  }

}

export default Edit
