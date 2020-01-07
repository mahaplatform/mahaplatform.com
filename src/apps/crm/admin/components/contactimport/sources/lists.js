import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Lists extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    records: PropTypes.array,
    selected: PropTypes.array,
    selectAll: PropTypes.bool,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func
  }

  static defaultProps = {}

  _handleSelectAll = this._handleSelectAll.bind(this)

  render() {
    const { records } = this.props
    return (
      <div className="contactimport-contacts">
        <div className="contactimport-contacts-header" onClick={ this._handleSelectAll }>
          <div className="contactimport-contacts-header-toggle">
            <i className={`fa fa-${this._getSelectAllIcon()}`} />
          </div>
          <div className="contactimport-contacts-header-label">
            Select All
          </div>
        </div>
        { records.map((list, index) => (
          <div className="contactimport-contact" key={`contact_${index}`} onClick={ this._handleSelect.bind(this, list)}>
            <div className="contactimport-contact-toggle">
              <i className={`fa fa-${this._getSelectIcon(list)}`} />
            </div>
            <div className="contactimport-contact-label">
              { list.name }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getSelectAllIcon() {
    const { selectAll } = this.props
    return selectAll ? 'check-circle' : 'circle-o'
  }

  _getSelectIcon(contact) {
    const { selected } = this.props
    return _.includes(selected, contact.id) ? 'check-circle' : 'circle-o'
  }

  _handleSelect(contact) {
    this.props.onSelect(contact.id)
  }

  _handleSelectAll() {
    this.props.onSelectAll()
  }

}

export default Lists
