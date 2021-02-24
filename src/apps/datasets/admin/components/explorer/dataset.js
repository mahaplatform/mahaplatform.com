import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Type from './type'

class Dataset extends React.PureComponent {

  static propTypes = {
    dataset: PropTypes.object,
    selected: PropTypes.object,
    onSelect: PropTypes.func
  }

  state = {
    expanded: false
  }

  _handleSelect = this._handleSelect.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded } = this.state
    const { dataset } = this.props
    return (
      <Fragment>
        <div className={ this._getClass() } onClick={ this._handleSelect }>
          <div className="datasets-explorer-item-toggle" onClick={ this._handleToggle }>
            <i className={`fa fa-${this._getIcon() }`} />
          </div>
          <div className="datasets-explorer-item-icon">
            <i className="fa fa-database" />
          </div>
          <div className="datasets-explorer-item-details">
            { dataset.title}
          </div>
          <div className="datasets-explorer-item-action">
            <i className="fa fa-ellipsis-v" />
          </div>
        </div>
        { expanded &&
          <Fragment>
            { dataset.types.map((type, tindex) => (
              <Type { ...this._getType(type) } key={`type_${tindex}`} />
            )) }
          </Fragment>
        }
      </Fragment>
    )
  }

  _getClass() {
    const { dataset, selected } = this.props
    const { dataset_id, type_id, view } = selected
    const classes = ['datasets-explorer-item']
    if(dataset_id === dataset.id && !type_id && !view) classes.push('selected')
    return classes.join(' ')
  }

  _getIcon() {
    const { expanded } = this.state
    return expanded ? 'chevron-down' : 'chevron-right'
  }

  _getType(type) {
    const { dataset, selected, onSelect } = this.props
    return {
      dataset,
      selected,
      type,
      onSelect
    }
  }

  _handleSelect() {
    const { dataset } = this.props
    this.props.onSelect({
      dataset_id: dataset.id,
      type_id: null,
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

export default Dataset
