import Extension from './extension'
import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Extensionsfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    extensions: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { extensions } = this.state
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { extensions.map((extension, index) => (
            <div className="crm-recipientsfield-recipient" key={`extension_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                <span className="crm-recipientsfield-recipient-extension">
                  { extension.extension }
                </span>
                { extension.name }
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleEdit.bind(this, index)}>
                <i className="fa fa-pencil" />
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleRemove.bind(this, index)}>
                <i className="fa fa-times" />
              </div>
            </div>
          ))}
          <div className="crm-recipientsfield-recipients-add">
            <Button { ...this._getAdd() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      extensions: defaultValue
    })
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { extensions } = this.state
    if(!_.isEqual(extensions, prevState.extensions)) {
      this.props.onChange(extensions)
    }
  }

  _getAdd() {
    return {
      label: 'Add Extension',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getNew() {
    return {
      mode: 'new',
      onDone: this._handleCreate
    }
  }

  _getEdit(index) {
    const extension = this.state.extensions[index]
    return {
      extension,
      mode: 'edit',
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _handleAdd() {
    this.context.form.push(Extension, this._getNew())
  }

  _handleCreate(extension) {
    const { extensions } = this.state
    this.setState({
      extensions: [
        ...extensions,
        extension
      ]
    })
  }

  _handleEdit(index) {
    this.context.form.push(Extension, this._getEdit(index))
  }

  _handleRemove(remove) {
    const { extensions } = this.state
    this.setState({
      extensions: extensions.filter((extension, index) => {
        return index !== remove
      })
    })
  }

  _handleUpdate(i, updated) {
    const { extensions } = this.state
    this.setState({
      extensions: extensions.map((extension, index) => {
        return index === i ? updated : extension
      })
    })
  }

  _handleValidate() {
    const { extensions } = this.state
    const { required, onValid } = this.props
    if(required && (!extensions || extensions.length === 0)) {
      return onValid(null, ['You must add at least 1 extension'])
    }
    onValid(extensions)
  }

}

export default Extensionsfield
