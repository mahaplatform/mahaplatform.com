import Token from '../../tokens/token'
import Searchbox from '../searchbox'
import Infinite from '../infinite'
import PropTypes from 'prop-types'
import Dynamic from './dynamic'
import Options from './options'
import React from 'react'
import _ from 'lodash'

class Search extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    defaultValue: PropTypes.any,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    format: PropTypes.any,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    options: PropTypes.any,
    prompt: PropTypes.string,
    q: PropTypes.string,
    selected: PropTypes.array,
    sort: PropTypes.object,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onQuery: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    filter: {},
    format: Token,
    multiple: false
  }

  state = {
    cacheKey: _.random(100000, 999999).toString(36)
  }

  render() {
    const { endpoint } = this.props
    if(!endpoint) return <Options { ...this._getOptions() }  />
    return (
      <div className="maha-search">
        <div className="maha-search-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <div className="maha-search-body">
          <Infinite {...this._getInfinite()} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props
    if(!_.isEqual(selected, prevProps.selected)) {
      this._handleChange(selected)
    }
  }

  _getDynamic() {
    const { cid, format, multiple, options, selected, text, value, onToggle } = this.props
    return { cid, format, multiple, options, selected, text, value, onToggle }
  }

  _getOptions() {
    const { cid, format, multiple, options, selected, onToggle } = this.props
    return { cid, format, multiple, options, selected, onToggle }
  }

  _getSearchbox() {
    const { label, prompt, onQuery } = this.props
    return {
      prompt: prompt || `Find a ${label}`,
      onChange: onQuery
    }
  }

  _getInfinite(){
    const { endpoint, filter, q, sort } = this.props
    const { cacheKey } = this.state
    return {
      cacheKey,
      endpoint,
      filter: {
        ...filter,
        q
      },
      layout: (props) => <Dynamic { ...props } { ...this._getDynamic() } />,
      sort
    }
  }

  _handleChange() {
    const { multiple, selected, onChange } = this.props
    const value = multiple ? selected : selected[0]
    onChange(value)
  }

}

export default Search
