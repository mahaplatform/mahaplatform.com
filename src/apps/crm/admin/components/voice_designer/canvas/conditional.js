import PropTypes from 'prop-types'
import Ending from './ending'
import React from 'react'
import Box from './box'

class Conditional extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string,
    options: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { options } = this.props
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-conditional">
          <div className="flowchart-box-icon">
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
              { option.then.map((box, index) => [
                <Box { ...box } key={`box_${index}`} />,
                ...(index < option.then.length - 1) ? [
                  <div className="flowchart-connector" key={`box_connector_${index}`}>
                    <div className="flowchart-line" />
                  </div>
                ] : []
              ])}
              { option.then[option.then.length - 1].type !== 'question' &&
                <div className="flowchart-connector" key={`box_connector_${index}`}>
                  <div className="flowchart-line" />
                </div>
              }
              { option.then[option.then.length - 1].type !== 'question' &&
                <Ending />
              }
            </div>
          )) }
        </div>
      </div>
    )
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
