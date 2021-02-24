import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const views = [
  { icon: 'check-square', label: 'Fields', code: 'fields' },
  { icon: 'filter', label: 'Filters', code: 'filters' },
  { icon: 'table', label: 'Data', code: 'data' }
]

class Type extends React.PureComponent {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    selected: PropTypes.object,
    type: PropTypes.object,
    onSelect: PropTypes.func
  }

  state = {
    expanded: false
  }

  _handleSelect = this._handleSelect.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded } = this.state
    const { type } = this.props
    return (
      <Fragment>
        <div className={ this._getClass() } onClick={ this._handleSelect.bind(this, null) }>
          <div className="datasets-explorer-item-padding" />
          <div className="datasets-explorer-item-toggle" onClick={ this._handleToggle }>
            <i className={`fa fa-${this._getIcon() }`} />
          </div>
          <div className="datasets-explorer-item-icon" >
            <i className="fa fa-file-text" />
          </div>
          <div className="datasets-explorer-item-details" >
            { type.title}
          </div>
          <div className="datasets-explorer-item-action" onClick={ this._handleTasks }>
            <i className="fa fa-ellipsis-v" />
          </div>
        </div>
        { expanded &&
          <Fragment>
            { views.map((view, index) => (
              <div className={ this._getViewClass(view.code) } key={`view_${index}`} onClick={ this._handleSelect.bind(this, view.code) }>
                <div className="datasets-explorer-item-padding" />
                <div className="datasets-explorer-item-padding" />
                <div className="datasets-explorer-item-icon" >
                  <i className={`fa fa-${view.icon}`} />
                </div>
                <div className="datasets-explorer-item-details" >
                  { view.label}
                </div>
              </div>
            )) }
          </Fragment>
        }
      </Fragment>
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

  _getViewClass(code) {
    const { dataset, selected, type } = this.props
    const { dataset_id, type_id, view } = selected
    const classes = ['datasets-explorer-item']
    if(dataset_id === dataset.id && type_id === type.id && view === code) classes.push('selected')
    return classes.join(' ')
  }

  _handleSelect(code) {
    const { dataset, type } = this.props
    this.props.onSelect({
      dataset_id: dataset.id,
      type_id: type.id,
      view: code
    })
  }

  _handleTasks() {
    this.context.tasks.open({
      items: [
        { label: 'Delete Type' }
      ]
    })
  }

  _handleToggle() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

}

export default Type
