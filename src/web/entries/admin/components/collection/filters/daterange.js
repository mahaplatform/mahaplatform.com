import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Search from '../../search'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class DaterangePanel extends React.Component {

  static propTypes = {
    format: PropTypes.any,
    label: PropTypes.string,
    include: PropTypes.array,
    name: PropTypes.string,
    results: PropTypes.object,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemovePanel: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleRemovePanel = this._handleRemovePanel.bind(this)
  _handleReset = this._handleReset.bind(this)

  render() {
    const { label } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-collection-filters-panel">
          <div className="maha-collection-filters-body">
            <Search { ...this._getSearch() } />
          </div>
          <div className="maha-collection-filters-footer">
            <button className="ui red fluid button" onClick={ this._handleReset }>
              Reset { label }
            </button>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { label } = this.props
    return {
      title: label,
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleRemovePanel }
      ]
    }
  }

  _getSearch() {
    const { label, name, include, text, value, results } = this.props
    const options = this._getOptions(include)
    const onChange = this._handleChange
    return { label, name, options, results, text, value, onChange }
  }

  _getOptions(include) {
    const options = []
    if(_.includes(include, 'this')) options.push({ value: 'this_week', description: this._getDescription(0, 'week'), text: 'This Week' })
    if(_.includes(include, 'last')) options.push({ value: 'last_week', description: this._getDescription(-1, 'week'), text: 'Last Week' })
    if(_.includes(include, 'next')) options.push({ value: 'next_week', description: this._getDescription(1, 'week'), text: 'Next Week' })
    if(_.includes(include, 'this')) options.push({ value: 'this_month', description: this._getDescription(0, 'month'), text: 'This Month' })
    if(_.includes(include, 'last')) options.push({ value: 'last_month', description: this._getDescription(-1, 'month'), text: 'Last Month' })
    if(_.includes(include, 'next')) options.push({ value: 'next_month', description: this._getDescription(1, 'month'), text: 'Next Month' })
    if(_.includes(include, 'this')) options.push({ value: 'this_quarter', description: this._getDescription(0, 'quarter'), text: 'This Quarter' })
    if(_.includes(include, 'last')) options.push({ value: 'last_quarter', description: this._getDescription(-1, 'quarter'), text: 'Last Quarter' })
    if(_.includes(include, 'next')) options.push({ value: 'next_quarter', description: this._getDescription(1, 'quarter'), text: 'Next Quarter' })
    if(_.includes(include, 'this')) options.push({ value: 'this_year', description: this._getDescription(0, 'year'), text: 'This Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_year', description: this._getDescription(-1, 'year'), text: 'Last Year' })
    if(_.includes(include, 'next')) options.push({ value: 'next_year', description: this._getDescription(1, 'year'), text: 'Next Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_30', description: this._getDescription(-1, 'year'), text: 'Last 30 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_30', description: this._getDescription(1, 'year'), text: 'Next 30 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_60', description: this._getDescription(-1, 'year'), text: 'Last 60 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_60', description: this._getDescription(1, 'year'), text: 'Next 60 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_90', description: this._getDescription(-1, 'year'), text: 'Last 90 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_90', description: this._getDescription(1, 'year'), text: 'Next 90 Days' })
    options.push({ value: 'ytd', description: this._getDescription(1, 'year'), text: 'Year to Date' })
    options.push({ value: 'ltd', description: this._getDescription(1, 'year'), text: 'Life to Date' })
    return options
  }

  _getDescription(quantity, unit) {
    const start = moment().add(quantity, unit).startOf(unit)
    const end = moment().add(quantity, unit).endOf(unit)
    const startdate = (start.format('YY') !== end.format('YY')) ? start.format('MMM D, YYYY') :  start.format('MMM D')
    const enddate =  (start.format('MM') !== end.format('MM')) ? end.format('MMM D, YYYY') : end.format('D, YYYY')
    return `${startdate} - ${enddate}`
  }

  _handleChange(value) {
    const { name } = this.props
    this.props.onChange(name, value)
  }

  _handleRemovePanel() {
    this.props.onRemovePanel()
  }

  _handleReset() {
    const { name, onChange } = this.props
    onChange(name, null)
  }

}

class Daterange extends React.Component {

  static propTypes = {
    format: PropTypes.func,
    label: PropTypes.string,
    mutiple: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array,
    results: PropTypes.object,
    values: PropTypes.object,
    onAddPanel: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { label } = this.props
    const count = this._getCount()
    return (
      <div className="maha-collection-filters-item" onClick={ this._handleClick }>
        <div className="maha-collection-filters-item-title">
          { label }
        </div>
        { count > 0 &&
          <div className="maha-collection-filters-item-description">
            <div className="maha-collection-filters-item-count">{ count }</div>
          </div>
        }
        <div className="maha-collection-filters-item-icon">
          <i className="fa fa-chevron-right" />
        </div>
      </div>
    )
  }

  _getCount() {
    const { name, results } = this.props
    return _.isNil(results[name]) ? 0 : 1
  }

  _handleClick() {
    this.props.onAddPanel(<DaterangePanel { ...this.props } />)
  }

}

export default Daterange
