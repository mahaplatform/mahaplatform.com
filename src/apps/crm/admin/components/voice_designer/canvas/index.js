import PropTypes from 'prop-types'
import React from 'react'
import Box from './box'

class Canvas extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { config } = this.props
    return (
      <div className="flowchart-canvas">
        <div className="flowchart">
          <div className="flowchart-branch">
            { config.map((box, index) => [
              <Box { ...box } key={`box_${index}`} />,
              ...(index < config.length - 1) ? [
                <div className="flowchart-connector" key={`box_connector_${index}`}>
                  <div className="flowchart-line" />
                </div>
              ] : []
            ]) }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Canvas
