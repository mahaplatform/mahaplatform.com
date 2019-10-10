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

  dpi = 96

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
    const { config } = this.props
    const { orientation, paper_size, margin_top, margin_bottom, margin_left, margin_right } = config.page
    const dimensions = this._getDimensions(paper_size)
    const width = orientation === 'portrait' ? dimensions[0] : dimensions[1]
    const height = orientation === 'portrait' ? dimensions[1] : dimensions[0]
    return {
      paddingTop: margin_top * this.dpi,
      paddingBottom: margin_bottom * this.dpi,
      paddingLeft: margin_left * this.dpi,
      paddingRight: margin_right * this.dpi,
      width: width * this.dpi,
      height: height * this.dpi
    }
  }

  _getDimensions(paper_size) {
    if(paper_size === 'letter') return [8.5, 11]
    if(paper_size === 'tabloid') return [11, 17]
    if(paper_size === 'legal') return [8.5, 14]
    if(paper_size === 'statement') return [5.5, 8.5]
    if(paper_size === 'executive') return [7.25, 10.5]
    if(paper_size === 'folio') return [8.5, 13]
    if(paper_size === 'a3') return [11.69, 16.54]
    if(paper_size === 'a4') return [8.27, 11.69]
    if(paper_size === 'a5') return [5.83, 8.27]
    if(paper_size === 'b4') return [9.84, 13.90]
    if(paper_size === 'b5') return [6.93, 9.84]
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
