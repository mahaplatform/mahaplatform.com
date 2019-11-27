import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'
import _ from 'lodash'

class Sections extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    sections: PropTypes.array,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  render() {
    const { sections } = this.props
    return (
      <div className="maha-form-sections">
        { sections.map((section, index) => (
          <Section key={`section_${index}`} { ...this._getSection(section, index) } />
        )) }
      </div>
    )
  }

  _getSection(section, index) {
    const { data, errors, onBusy, onReady, onUpdateData } = this.props
    return {
      ...section,
      data,
      errors,
      tabIndexStart: this._getTabIndexStart(section, index),
      onBusy,
      onReady,
      onUpdateData
    }
  }

  _getTabIndexStart(section, index) {
    const { sections } = this.props
    return sections.reduce((start, section, i) => {
      return start + (i < index ? section.fields.length : 0)
    }, _.random(0,1000))
  }

}

export default Sections
