import Token from '../../tokens/token'
import Searchbox from '../searchbox'
import Message from '../message'
import Infinite from '../infinite'
import PropTypes from 'prop-types'
import Dynamic from './dynamic'
import Options from './options'
import React from 'react'
import _ from 'lodash'

class Search extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    autofocus: PropTypes.bool,
    defaultValue: PropTypes.any,
    excludeIds: PropTypes.array,
    empty: PropTypes.object,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    format: PropTypes.any,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    options: PropTypes.any,
    prompt: PropTypes.string,
    q: PropTypes.string,
    search: PropTypes.bool,
    selected: PropTypes.any,
    sort: PropTypes.object,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onQuery: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    autofocus: false,
    empty: {
      icon: 'times',
      text: 'No Records Found'
    },
    filter: {},
    format: Token,
    label: 'Item',
    multiple: false,
    search: true,
    onChange: () => {}
  }

  render() {
    const { empty, endpoint, options, search } = this.props
    return (
      <div className="maha-search">
        { search &&
          <div className="maha-search-header">
            <Searchbox { ...this._getSearchbox() } />
          </div>
        }
        { endpoint &&
          <div className="maha-search-body">
            <Infinite {...this._getInfinite()} />
          </div>
        }
        { options && options.length > 0 &&
          <div className="maha-search-options">
            <Options { ...this._getOptions() }  />
          </div>
        }
        { options && options.length === 0 &&
          <div className="maha-search-body">
            <Message { ...empty } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) return onSet(_.castArray(defaultValue))
    onSet([])
  }

  componentDidUpdate(prevProps) {
    const { multiple, selected } = this.props
    if(!_.isEqual(multiple, prevProps.multiple)) {
      this._handleChange()
    }
    if(!_.isEqual(selected, prevProps.selected) && prevProps.selected) {
      this._handleChange()
    }
  }

  _getOptions() {
    const { cid, excludeIds, format, multiple, options, selected, text, value, onToggle } = this.props
    return {
      cid,
      excludeIds,
      format,
      multiple,
      options,
      selected,
      text,
      value,
      onToggle
    }
  }

  _getSearchbox() {
    const { autofocus, label, prompt, onQuery } = this.props
    return {
      autofocus,
      prompt: prompt || `Find a ${label}`,
      onChange: onQuery
    }
  }

  _getInfinite(){
    const { endpoint, filter, q, sort } = this.props
    return {
      endpoint,
      filter: {
        ...filter,
        q
      },
      layout: Dynamic,
      props: this._getProps(),
      sort
    }
  }

  _getProps() {
    const { cid, excludeIds, format, multiple, options, selected, text, value, onToggle } = this.props
    return {
      cid,
      excludeIds,
      format,
      multiple,
      options,
      selected,
      text,
      value,
      onToggle
    }
  }

  _handleChange() {
    const { multiple, selected, onChange } = this.props
    onChange(multiple ? selected : selected[0])
  }

}

export default Search
