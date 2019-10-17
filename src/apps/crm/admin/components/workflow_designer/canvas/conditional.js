import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'
import Box from './box'

class Conditional extends React.PureComponent {

  static propTypes = {
    blocks: PropTypes.array,
    action: PropTypes.string,
    options: PropTypes.array
  }

  render() {
    const { options } = this.props
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box">
          <div className="flowchart-box-icon workflow-designer-icon-conditional">
            <i className={`fa fa-${this._getIcon()}`} />
          </div>
          <div className="flowchart-box-label">
            { this._getLabel() }
          </div>
        </div>
        <div className="flowchart-connector">
          <div className="flowchart-line" />
        </div>
        <div className="flowchart-branches">
          { options.map((option, index) => (
            <div className="flowchart-branch" key={`options_${index}`}>
              <div className="flowchart-line">
                <div className="flowchart-line-label">
                  { option.text }
                </div>
              </div>
              <Trunk boxes={ option.then } blocks={ this.props.blocks } />
            </div>
          )) }
        </div>
      </div>
    )
  }

  _getBox(box) {
    const { blocks } = this.props
    return {
      ...box,
      blocks
    }
  }

  _getIcon() {
    const { action } = this.props
    if(action === 'question') return 'question'
    if(action === 'ifelse') return 'random'
  }

  _getLabel() {
    const { action } = this.props
    if(action === 'question') return 'Question'
    if(action === 'ifelse') return 'If / Else'
  }

}

export default Conditional
