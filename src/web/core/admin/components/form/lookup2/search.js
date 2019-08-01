import ModalPanel from '../../modal_panel'
import ToggleList from '../toggle_list'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Search extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    endpoint: PropTypes.string,
    form: PropTypes.object,
    format: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    label: PropTypes.string,
    multiple: PropTypes.bool,
    options: PropTypes.array,
    selected: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onCancel: PropTypes.func,
    onDone: PropTypes.func,
    onShowForm: PropTypes.func,
    onSelect: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { form, label } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <ToggleList { ...this._getToggleList() } />
        { form &&
          <div className="maha-lookup-panel-add">
            <div className="ui fluid red button" onClick={ this._handleAdd.bind(this)}>
              Add {label}
            </div>
          </div>
        }
      </ModalPanel>
    )
  }

  _getPanel() {
    const { label, multiple } = this.props
    return {
      title: `Choose ${label}`,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel.bind(this) }
      ],
      rightItems: multiple ? [
        { label: 'Done', handler: this._handleDone.bind(this) }
      ] : null
    }
  }

  _getToggleList() {
    const { endpoint, format, multiple, options, selected, text, value } = this.props
    const defaultValue = selected.map(item => _.get(item, value))
    return {
      defaultValue,
      endpoint,
      options,
      format,
      full: true,
      multiple,
      text,
      value,
      onChange: this._handleSelect.bind(this)
    }
  }

  _handleAdd() {
    this.props.onShowForm()
  }

  _handleSelect(items) {
    const { multiple, selected, onDone, onSelect } = this.props
    onSelect(items)
    if(!multiple && !_.isEqual(items, selected)) onDone()
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Search
