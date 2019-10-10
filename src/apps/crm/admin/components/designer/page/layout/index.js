import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'

class Layout extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onAddSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onMoveSection: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAddSection = this._handleAddSection.bind(this)

  render() {
    const { config } = this.props
    return (
      <div className="designer-layout">
        { config.sections.map((section, index) => (
          <Section key={`section_${index}`} { ...this._getSection(section, index) } />
        ))}
        <div className="designer-layout-section-add" onClick={ this._handleAddSection }>
          <div className="designer-layout-section-add-icon">
            <i className="fa fa-plus" />
          </div>
          <div className="designer-layout-section-add-label">
            Add Section
          </div>
        </div>
      </div>
    )
  }

  _getSection(section, index) {
    const { onDeleteSection, onMoveSection, onUpdate } = this.props
    return {
      index,
      section,
      onDeleteSection,
      onMoveSection,
      onUpdate
    }
  }

  _handleAddSection() {
    this.props.onAddSection()
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer[props.cid].config
})

export default connect(mapStateToProps)(Layout)
