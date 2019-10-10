import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'

class Document extends React.Component {

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    children: PropTypes.any,
    onAction: PropTypes.func
  }

  render() {
    const { config } = this.props
    return (
      <div className="document" style={ this._getStyle() }>
        { config.sections && config.sections.map((section, index) => (
          <Section key={`section_${index}`} { ...this._getSection(section, index)} />
        )) }
      </div>
    )
  }

  _getStyle() {
    const dpi = 96
    const width = 8.5
    const height = 11
    return {
      width: width * dpi,
      height: height * dpi
    }
  }

  _getSection(section, index) {
    const { active, onAction } = this.props
    return {
      active,
      config: section,
      sectionIndex: index,
      onAction
    }
  }

}

export default Document
