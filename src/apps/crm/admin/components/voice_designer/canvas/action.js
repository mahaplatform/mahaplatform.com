import PropTypes from 'prop-types'
import React from 'react'

class Action extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string
  }

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-action">
          <div className="flowchart-box-icon">
            <i className={`fa fa-${this._getIcon()}`} />
          </div>
          <div className="flowchart-box-label">
            { this._getLabel() }
          </div>
        </div>
      </div>
    )
  }

  _getIcon() {
    const { action } = this.props
    if(action === 'send_email') return 'envelope'
    if(action === 'send_sms') return 'comment'
    if(action === 'update_property') return 'user'
    if(action === 'update_interest') return 'book'
    if(action === 'add_to_list') return 'users'
    if(action === 'remove_from_list') return 'users'
    if(action === 'enroll_in_workflow') return 'gears'
  }

  _getLabel() {
    const { action } = this.props
    if(action === 'send_email') return 'Send Email'
    if(action === 'send_sms') return 'Send SMS'
    if(action === 'update_property') return 'Update Property'
    if(action === 'update_interest') return 'Update Interest'
    if(action === 'add_to_list') return 'Add to List'
    if(action === 'remove_from_list') return 'Remove from List'
    if(action === 'enroll_in_workflow') return 'Enroll in Workflow'
  }

}

export default Action
