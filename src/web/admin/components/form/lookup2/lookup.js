import PropTypes from 'prop-types'
import Form from '../../form'
import Search from './search'
import React from 'react'
import _ from 'lodash'

class Lookup extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.any,
    adding: PropTypes.bool,
    cacheKey: PropTypes.string,
    cid: PropTypes.string,
    defaultValue: PropTypes.any,
    endpoint: PropTypes.string,
    form: PropTypes.object,
    format: PropTypes.any,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    selected: PropTypes.array,
    text: PropTypes.string,
    tabIndex: PropTypes.number,
    value: PropTypes.string,
    onBegin: PropTypes.func,
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    onFetch: PropTypes.func,
    onHideForm: PropTypes.func,
    onReady: PropTypes.func,
    onRefresh: PropTypes.func,
    onRemove: PropTypes.func,
    onSelect: PropTypes.func,
    onShowForm: PropTypes.func

  }

  static defaultProps = {
    format: ({ value }) => <div className="maha-lookup2-token">{ value }</div>,
    label: 'Record',
    multiple: false,
    placeholder: null,
    value: 'value',
    text: 'text'
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { placeholder, selected, tabIndex, text } = this.props
    return (
      <div className={ this._getClass() } tabIndex={ tabIndex }>
        <div className="maha-lookup2-items" onClick={ this._handleBegin }>
          { selected.map((item, index) => (
            <div className="maha-lookup2-item" key={ `selected_${index}` }>
              { _.get(item, text) }
            </div>
          )) }
          { selected.length === 0 && placeholder &&
            <div className="maha-lookup2-placeholder">{ placeholder }</div>
          }
        </div>
        { selected.length > 0 &&
          <div className="maha-lookup-field-clear">
            <i className="fa fa-times" onClick={ this._handleClear} />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, endpoint, multiple, value, onFetch, onReady } = this.props
    const query = { $filter: { [value]: { $in: defaultValue } } }
    console.log(defaultValue)
    if(defaultValue && (!multiple || defaultValue.length > 0)) onFetch(endpoint, query)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { form } = this.context
    const { active, adding, selected } = this.props
    if(!prevProps.active && active) form.push(<Search { ...this._getSearch() } />)
    if(!prevProps.adding && adding) form.push(<Form { ...this._getForm() } />)
    if(prevProps.active && !active) form.pop()
    if(!_.isEqual(selected, prevProps.selected)) {
      this._handleChange()
    }
  }

  _getClass() {
    const { multiple } = this.props
    const classes = ['maha-lookup2-field']
    if(multiple) classes.push('multiple')
    return classes.join(' ')
  }

  _getForm() {
    const { form } = this.context
    const { selected, onHideForm, onRefresh, onSelect } = this.props
    return {
      ...this.props.form,
      onCancel: () => {
        onHideForm()
        form.pop()
      },
      onSuccess: (chosen) => {
        onSelect([...selected,chosen])
        onRefresh()
        onHideForm()
        form.pop()
      }
    }
  }

  _getSearch() {
    const { cacheKey, cid, endpoint, form, format, label, multiple, options, selected, text, value, onShowForm } = this.props
    return {
      cacheKey,
      cid,
      endpoint,
      form,
      format,
      label,
      multiple,
      options,
      selected,
      text,
      value,
      onShowForm,
      onCancel: this._handleEnd.bind(this),
      onDone: this._handleEnd.bind(this),
      onSelect: this._handleSelect.bind(this)
    }
  }

  _getValue() {
    const { multiple, selected, value } = this.props
    const values = selected.map(item => _.get(item, value))
    return multiple ? values : values[0]
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleEnd() {
    this.props.onEnd()
  }

  _handleRemove(index, e) {
    e.stopPropagation()
    this.props.onRemove(index)
  }

  _handleSelect(items) {
    this.props.onSelect(items)
  }

  _handleClear() {
    this.props.onSelect([])
  }

  _handleChange() {
    this.props.onChange(this._getValue())
  }

}

export default Lookup
