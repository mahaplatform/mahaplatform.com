import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

class Fields extends React.PureComponent {

  static propTypes = {
    dataset: PropTypes.object,
    selected: PropTypes.object,
    type: PropTypes.object,
    onSelect: PropTypes.func
  }

  _handleSelect = this._handleSelect.bind(this)

  render() {
    return (
      <div className="datasets-explorer-item">
        <div className="datasets-explorer-item-padding" />
        <div className="datasets-explorer-item-padding" />
        <div className="datasets-explorer-item-icon" >
          <i className="fa fa-check-square" />
        </div>
        <div className="datasets-explorer-item-details" >
          Fields
        </div>
      </div>
    )
  }

  _getClass() {
    const { dataset, selected, type } = this.props
    const { dataset_id, type_id, view } = selected
    const classes = ['datasets-explorer-item']
    if(dataset_id === dataset.id && type_id === type.id && !view) classes.push('selected')
    return classes.join(' ')
  }

  _getIcon() {
    const { expanded } = this.state
    return expanded ? 'chevron-down' : 'chevron-right'
  }

  _handleSelect() {
    const { dataset, type } = this.props
    this.props.onSelect({
      dataset_id: dataset.id,
      type_id: type.id,
      view: null
    })
  }

  _handleToggle() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

}

export default Fields
