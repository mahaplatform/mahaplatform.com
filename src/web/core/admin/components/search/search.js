import Searchbox from '../searchbox'
import Infinite from '../infinite'
import { digest } from 'json-hash'
import PropTypes from 'prop-types'
import Dynamic from './dynamic'
import Options from './options'
import React from 'react'

class Search extends React.Component {

  static propTypes = {
    endpoint: PropTypes.string,
    filter: PropTypes.object
  }

  static defaultProps = {
    filter: {}
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

  _getOptions() {
    const { format, name, multiple, options, results, onUpdate } = this.props
    return { format, name, multiple, options, results, onUpdate }
  }

  _getSearchbox() {
    const { label, prompt, onQuery } = this.props
    return {
      prompt: prompt || `Find a ${label}`,
      onChange: onQuery
    }
  }

  _getInfinite(){
    const { endpoint, filter, q, results, sort } = this.props
    const cacheKey = digest(results)
    return {
      cacheKey,
      endpoint,
      filter: {
        ...filter,
        q
      },
      layout: (props) => <Dynamic { ...this._getDynamic() } { ...props } />,
      sort
    }
  }

  _getDynamic() {
    return this.props
  }

}

export default Search
