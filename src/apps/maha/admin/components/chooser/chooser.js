import { ModalPanel, ToggleList } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class chooser extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    filters: PropTypes.array,
    format: PropTypes.any,
    ids: PropTypes.array,
    method: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    result: PropTypes.any,
    status: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onDone: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    method: 'PATCH',
    multiple: false
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <ToggleList { ...this._getToggleList() } />
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(prevProps.status !== status && status === 'success') {
      this._handleDone()
    }
  }

  _getPanel() {
    const { title } = this.props
    return {
      className: 'maha-chooser',
      title,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel.bind(this) }
      ],
      rightItems: [
        { label: 'Save', handler: this._handleSave.bind(this) }
      ]
    }
  }

  _getToggleList() {
    const { defaultValue, endpoint, format, filters, multiple, text, value } = this.props
    return {
      defaultValue,
      endpoint,
      filters,
      format,
      multiple,
      text,
      value,
      onChange: this._handleChange.bind(this)
    }
  }

  _handleChange(ids) {
    this.props.onSet(ids)
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone() {
    const { result, onDone } = this.props
    onDone(result)
    this.context.modal.close()
  }
  
  _handleSave() {
    const { action, ids, method, multiple } = this.props
    const defaultName = multiple ? 'ids' : 'id'
    const name = this.props.name || defaultName
    const body = multiple ? { [name]: ids } : { [name]: ids[0] }
    this.props.onSave(action, method, body)
  }

}

export default chooser
