import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Button from '../../button'
import Search from '../../search'
import React from 'react'
import New from './new'

class Chooser extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    chosen: PropTypes.any,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    form: PropTypes.object,
    format: PropTypes.any,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    options: PropTypes.array,
    prompt: PropTypes.string,
    text: PropTypes.string,
    search: PropTypes.bool,
    value: PropTypes.string,
    onChoose: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { form } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-lookup-options">
          <div className="maha-lookup-options-body">
            <Search { ...this._getSearch() } />
          </div>
          { form &&
            <div className="maha-lookup-options-footer">
              <Button { ...this._getButton() } />
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  _getButton() {
    return {
      label: 'Add New',
      color: 'red',
      handler: this._handleAdd
    }
  }

  _getNew() {
    const { form } = this.props
    return {
      form,
      onSuccess: this._handleSuccess
    }
  }

  _getPanel() {
    const { label } = this.props
    return {
      title: `Choose ${label}`,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getSearch() {
    const { chosen, endpoint, filter, format, label, multiple, options, prompt, search, text } = this.props
    return {
      autofocus: true,
      defaultValue: chosen,
      endpoint,
      filter,
      format,
      label,
      multiple,
      options,
      prompt,
      search,
      text,
      onChange: this._handleChoose
    }
  }

  _handleAdd() {
    this.context.form.push(New, this._getNew.bind(this))
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(chosen) {
    this.props.onChoose(chosen)
    this.context.form.pop()
  }

  _handleSuccess(chosen) {
    this.props.onChoose(chosen)
    this.context.form.pop(-2)
  }

}

export default Chooser
