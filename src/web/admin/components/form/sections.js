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
          <Section key={`section_${index}`} { ...this._getSection(sections, section, index) } />
        )) }
      </div>
    )
  }

  _getSection(config, section, index) {
    const { data, errors, onBusy, onReady, onUpdateData } = this.props
    const tabIndexStart = config.reduce((start, section, i) => {
      if(i >= index) return start
      return start + section.fields.length
    }, _.random(0,1000))
    return {
      ...section,
      data,
      errors,
      tabIndexStart,
      onBusy,
      onReady,
      onUpdateData
    }
  }

}

export default Sections
