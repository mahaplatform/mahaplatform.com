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
    users: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
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

  render() {
    const { extensions } = this.state
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { extensions.map((extension, index) => (
            <div className="crm-recipientsfield-recipient" key={`extension_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                <div>
                  <span className="crm-recipientsfield-recipient-extension">
                    { extension.extension }
                  </span>
                  { this._getDescription(extension) }
                </div>
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleRemove.bind(this, index)}>
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
    this.props.onReady()
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

  _getExtension() {
    const { users } = this.props
    return {
      users,
      onDone: this._handleCreate
    }
  }

  _getDescription(extension) {
    const { user_id } = extension
    const { users } = this.props
    const user = _.find(users, {
      id: user_id
    })
    return user.full_name
  }

  _handleAdd() {
    this.context.form.push(Extension, this._getExtension())
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

  _handleRemove(remove) {
    const { extensions } = this.state
    this.setState({
      extensions: extensions.filter((extension, index) => {
        return index !== remove
      })
    })
  }

}

export default Extensionsfield
