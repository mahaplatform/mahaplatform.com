import Token from '../../../tokens/token'
import Searchbox from '../../searchbox'
import Infinite from '../../infinite'
import PropTypes from 'prop-types'
import Result from './results'
import React from 'react'
import _ from 'lodash'

class ToggleList extends React.Component{

  static propTypes = {
    chosen: PropTypes.any,
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    exclude_ids: PropTypes.array,
    full: PropTypes.bool,
    format: PropTypes.any,
    multiple: PropTypes.bool,
    options: PropTypes.array,
    query: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string,
    onLoad: PropTypes.func,
    onReady: PropTypes.func,
    onChange: PropTypes.func,
    onSetChosen: PropTypes.func,
    onSetQuery: PropTypes.func,
    onToggleRecord: PropTypes.func
  }

  static defaultProps = {
    exclude_ids: [],
    format: Token,
    full: false,
    multiple: false,
    value: 'value',
    text: 'text',
    onReady: () => {},
    onChange: (value) => {}
  }

  _handleToggleRecord = this._handleToggleRecord.bind(this)

  render() {
    const { chosen, endpoint, multiple, options, text } = this.props
    return (
      <div className="maha-toggle-list">
        <div className="maha-toggle-list-body">
          <div className="maha-toggle-list-header">
            <Searchbox { ...this._getSearchbox() } />
          </div>
          { multiple && chosen &&
            <div className="maha-toggle-list-summary">
              { chosen.map((record, index) => (
                <div key={`summary_token_${index}`} className="maha-toggle-list-summary-token">
                  <div className="maha-toggle-list-summary-token-label">
                    { _.get(record, text) }
                  </div>
                  <div className="maha-toggle-list-summary-token-remove" onClick={ this._handleToggleRecord.bind(this, record) }>
                    <i className="fa fa-fw fa-times" />
                  </div>
                </div>
              )) }
            </div>
          }
          { endpoint && <Infinite { ...this._getInfinite() } /> }
          { options && <Result records={ options } { ...this._getResults() } /> }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue && defaultValue.length > 0) this._handleLoad()
    if(onReady) onReady()
  }

  componentDidUpdate(prevProps) {
    const { chosen, full, value, onChange } = this.props
    if(onChange && chosen && !_.isEqual(prevProps.chosen, chosen)) {
      const items = chosen.map(record => full ? record : _.get(record, value))
      onChange(items)
    }
  }

  _getResults() {
    const { chosen, format, multiple , text, value} = this.props
    return {
      format,
      chosen,
      multiple,
      text,
      value,
      onToggleRecord: this._handleToggleRecord
    }
  }
  
  _getSearchbox() {
    const { onSetQuery } = this.props
    return {
      onChange: onSetQuery
    }
  }

  _getInfinite() {
    const { chosen, endpoint, exclude_ids, query } = this.props
    return {
      endpoint,
      exclude_ids,
      filter: {
        q: query
      },
      chosen,
      layout: Result,
      props: this._getResults()
    }
  }

  _handleLoad() {
    const { defaultValue, endpoint, options, value, onLoad, onSetChosen } = this.props
    if(endpoint) return onLoad(endpoint, { $filter: { id: { $in: defaultValue } } })
    if(!options) return
    const chosen = options.filter(option => _.includes(defaultValue, _.get(option, value)))
    onSetChosen(chosen)
  }


  _handleToggleRecord(record) {
    const { multiple, onToggleRecord } = this.props
    if(onToggleRecord) onToggleRecord(multiple, record)
  }

}

export default ToggleList
