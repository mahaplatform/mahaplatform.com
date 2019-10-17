import PropTypes from 'prop-types'
import React from 'react'
import Box from './box'

class Canvas extends React.PureComponent {

  static propTypes = {
    blocks: PropTypes.array,
    config: PropTypes.array
  }

  render() {
    const { config } = this.props
    return (
      <div className="flowchart-canvas">
        <div className="flowchart">
          <div className="flowchart-branch">
            <Box { ...this._getBox({ type: 'trigger' }) } />
            <div className="flowchart-connector">
              <div className="flowchart-line" />
            </div>
            { config.map((box, index) => [
              <Box { ...this._getBox(box) } key={`box_${index}`} />,
              ...(index < config.length - 1) ? [
                <div className="flowchart-connector" key={`box_connector_${index}`}>
                  <div className="flowchart-line" />
                </div>
              ] : []
            ]) }
            { (config.length === 0 || config[config.length - 1].type !== 'conditional') && [
              ...(config.length > 0) ? [
                <div className="flowchart-connector" key="connector">
                  <div className="flowchart-line" />
                </div>
              ] : [],
              <Box { ...this._getBox({ type: 'ending' }) } key="ending" />
            ] }
          </div>
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

}

export default Canvas
