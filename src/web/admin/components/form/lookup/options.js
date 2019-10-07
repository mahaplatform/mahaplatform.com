import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Searchbox from '../../searchbox'
import Infinite from '../../infinite'
import Format from '../../format'

class Options extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    format: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string
    ]),
    options: PropTypes.array,
    selected: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChoose: PropTypes.func
  }

  render() {
    const { format, options, selected, text, value } = this.props
    return (
      <div className="maha-lookup-panel-results">
        { options.map((option, index) => (
          <div key={`result_${option.id || index}`} className="maha-lookup-panel-result" onClick={ this._handleChoose.bind(this, option) }>
            <div className="maha-lookup-panel-result-label">
              <Format { ...option } format={ format } value={ _.get(option, value) } text={ _.get(option, text) } />
            </div>
            <div className="maha-lookup-panel-result-icon">
              { index === selected ? <i className="fa fa-fw fa-check" /> : null }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleChoose(chosen) {
    const { onChoose, onChange, value } = this.props
    onChoose(chosen)
    onChange(_.get(chosen, value))
    this.context.form.pop()
  }

}

class Dynamic extends React.Component {

  static propTypes = {
    format: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string
    ]),
    records: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    selected: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (records) ? <Options { ...this._getOptions() } /> : null
  }

  _getOptions() {
    const { format, selected, records, text, value, onChoose, onChange } = this.props
    return {
      format,
      selected,
      options: records,
      text,
      value,
      onChoose,
      onChange
    }
  }

}

class Container extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    cacheKey: PropTypes.string,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    form: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.array,
    q: PropTypes.string,
    search: PropTypes.bool,
    sort: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onQuery: PropTypes.func,
    onShowForm: PropTypes.func
  }

  render() {
    const { endpoint, label, form, search } = this.props
    return (
      <div className="maha-lookup-panel">
        { search &&
          <div className="maha-lookup-panel-search">
            <Searchbox { ...this._getSearchbox() } />
          </div>
        }
        { endpoint && <Infinite { ...this._getInfinite() } /> }
        { !endpoint && <Options { ...this._getStaticOptions() } /> }
        { form &&
          <div className="maha-lookup-panel-add">
            <div className="ui fluid red button" onClick={ this._handleAdd.bind(this)}>
              Add {label}
            </div>
          </div>
        }
      </div>
    )
  }

  _getSearchbox() {
    const { label, onQuery } = this.props
    return {
      prompt: `Find a ${label}`,
      onChange: onQuery
    }
  }

  _getInfinite() {
    const { cacheKey, endpoint, filter, q, sort, text, value } = this.props
    return {
      cacheKey,
      endpoint,
      filter: {
        ...filter,
        q
      },
      layout: Dynamic,
      props: this.props,
      sort,
      text,
      value
    }
  }

  _handleAdd() {
    this.props.onShowForm()
  }

  _getStaticOptions() {
    const { options, q } = this.props
    return {
      ...this.props,
      options: options.filter(options => q === null || options.text.search(q) >= 0)
    }
  }

}

export default Container
