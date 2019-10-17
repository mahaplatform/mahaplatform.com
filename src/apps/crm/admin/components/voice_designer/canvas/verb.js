import PropTypes from 'prop-types'
import React from 'react'

class Verb extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string
  }

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-verb">
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
    if(action === 'play') return 'play'
    if(action === 'say') return 'volume-control-phone'
  }

  _getLabel() {
    const { action } = this.props
    if(action === 'play') return 'Play Recording'
    if(action === 'say') return 'Speak text'
  }

}

export default Verb
