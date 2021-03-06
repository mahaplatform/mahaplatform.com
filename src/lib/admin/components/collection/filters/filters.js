import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Overview from './overview'
import React from 'react'
import _ from 'lodash'

class Filters extends React.Component {

  static propTypes = {
    filters: PropTypes.array,
    filtered: PropTypes.object,
    panels: PropTypes.array,
    results: PropTypes.object,
    values: PropTypes.object,
    onAddPanel: PropTypes.func,
    onChange: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemovePanel: PropTypes.func,
    onSet: PropTypes.func
  }

  render() {
    const { panels } = this.props
    return (
      <div className="maha-collection-filters">
        <Overview { ...this._getOverview() } />
        <TransitionGroup>
          { panels.map((panel, index) => (
            <CSSTransition key={ `filter_panel_${index}` } classNames="slide" timeout={ 250 }>
              { React.cloneElement(panel, { ...this._getPanel(), key: `filter_panel_${index}` }) }
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    )
  }

  componentDidMount() {
    if(this.props.values) this._handleSet(this.props.values)
  }

  componentDidUpdate(prevProps) {
    const { results } = this.props
    if(!_.isEqual(prevProps.results, results)) {
      this._handleChange()
    }
  }

  _getOverview() {
    return this.props
  }

  _getPanel() {
    const { results, onChange, onRemovePanel } = this.props
    return {
      results,
      onChange,
      onRemovePanel
    }
  }

  _getValue(value) {
    if(value.$in) return value.$in
    if(value.$eq) return { key: value.$eq, value: '' }
    if(value.$dr) return { key: value.$dr, value: '' }
    return value
  }

  _handleChange() {
    const { filtered } = this.props
    this.props.onUpdate(filtered)
  }

  _handleSet(defaultValue) {
    const values = defaultValue.$and.reduce((values, criteria) => {
      const key = Object.keys(criteria)[0]
      return {
        ...values,
        [key]: this._getValue(criteria[key])
      }
    }, {})
    this.props.onSet(values)
  }

}

export default Filters
