import { Message, Scrollpane, Searchbox } from '@admin'
import PropTypes from 'prop-types'
import Result from './result'
import React from 'react'

class OmniSearch extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    cacheKey: PropTypes.string,
    chosen: PropTypes.object,
    choice: PropTypes.object,
    query: PropTypes.string,
    results: PropTypes.object,
    onChoose: PropTypes.func,
    onClearRecent: PropTypes.func,
    onFetchResults: PropTypes.func,
    onType: PropTypes.func,
    onSave: PropTypes.func
  }

  _handleClearRecent = this._handleClearRecent.bind(this)
  _handleFetchResults = this._handleFetchResults.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { results } = this.props
    const models = results ? Object.keys(results) : []
    const total = results ? models.reduce((total, model) => total + results[model].results.length, 0) : 0
    return (
      <div className="maha-omnisearch-panel">
        <div className="maha-omnisearch-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        { !results && <Message { ...this._getLanding() } /> }
        { results && total === 0 && <Message { ...this._getEmpty() } /> }
        { results && total > 0 &&
          <Scrollpane>
            { models.map((model, modelIndex) => (
              <div key={`model_${modelIndex}`} className="maha-omnisearch-section">
                <div className="maha-omnisearch-section-header maha-scrollpane-header">
                  <div className={`maha-omnisearch-section-header-icon ${results[model].color}`}>
                    <i className={`fa fa-fw fa-${results[model].icon}`} />
                  </div>
                  { model }
                </div>
                { results[model].results.map((result, index) => (
                  <Result { ...result } key={`result_${modelIndex}_${index}`} onClick={ this._handleChoose.bind(this, model, index) } />
                ))}
              </div>
            ))}
          </Scrollpane>
        }
      </div>
    )
  }

  _getSearchbox() {
    return {
      prompt: 'Find anything...',
      onChange: this._handleType
    }
  }

  _getEmpty() {
    return {
      icon: 'remove',
      title: 'No results matched your query'
    }
  }

  _getLanding() {
    return {
      icon: 'search',
      title: 'Search for anything'
    }
  }

  _getRecent() {
    const { cacheKey } = this.props
    return {
      cacheKey,
      endpoint: '/api/admin/searches',
      empty: <Message { ...this._getLanding() } />,
      layout: ({ records }) => (
        <div className="maha-omnisearch-section">
          <div className="maha-omnisearch-section-header maha-scrollpane-header">
            Recent Searches
            <div className="maha-omnisearch-section-header-link" onClick={ this._handleClearRecent }>
              clear
            </div>
          </div>
          { records.map((result, index) => (
            <Result { ...result } key={`result_${index}`} onClick={ this._handleChooseRecent.bind(this, result) } />
          ))}
        </div>
      )
    }
  }

  _handleChoose(model, index) {
    const { router } = this.context
    const { results, onChoose } = this.props
    const choice = results[model].results[index]
    this._handleSave(choice)
    onChoose(model, index)
    router.history.push(choice.route)
  }

  _handleChooseRecent(choice) {
    const { router } = this.context
    this._handleSave(choice)
    router.history.push(choice.route)
  }

  _handleClearRecent() {
    this.props.onClearRecent()
  }

  _handleFetchResults(q) {
    this.props.onFetchResults(q)
  }

  _handleType(q) {
    this.props.onType(q)
    this._handleFetchResults(q)
  }

  _handleSave(choice) {
    const { onSave } = this.props
    onSave({
      text: choice.text,
      route: choice.route,
      extra: choice.extra
    })
  }

}

export default OmniSearch
