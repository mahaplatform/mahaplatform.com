import ModalPanel from '../../modal_panel'
import ToggleList from '../toggle_list'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Search extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    cacheKey: PropTypes.string,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
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
  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { cacheKey, form, label } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <ToggleList { ...this._getToggleList() } key={ cacheKey } />
        { form &&
          <div className="maha-lookup-panel-add">
            <div className="ui fluid red button" onClick={ this._handleAdd }>
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
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: multiple ? [
        { label: 'Done', handler: this._handleDone }
      ] : null
    }
  }

  _getToggleList() {
    const { endpoint, filter, format, multiple, options, selected, text, value } = this.props
    const defaultValue = selected.map(item => _.get(item, value))
    return {
      defaultValue,
      endpoint,
      filter,
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

const mapStateToProps = (state, props) => ({
  cacheKey: state.maha.lookup2[props.cid].cacheKey
})

export default connect(mapStateToProps)(Search)
