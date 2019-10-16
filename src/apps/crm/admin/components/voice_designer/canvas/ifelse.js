import PropTypes from 'prop-types'
import React from 'react'
import Box from './box'

class IfElse extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    options: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { options } = this.props
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-ifelse">
          <div className="flowchart-box-icon">
            <i className="fa fa-random" />
          </div>
          <div className="flowchart-box-label">
            if / else
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
            </div>
          )) }
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default IfElse
