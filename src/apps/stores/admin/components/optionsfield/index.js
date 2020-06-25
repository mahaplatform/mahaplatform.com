import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import New from './new'

class OptionsField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    options: [
      { id: 1, title: 'Size', config: { values: ['Small','Medium','Large'] } },
      { id: 2, title: 'Color', config: { values: ['Red','Green','Blue'] } }
    ]
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { options } = this.state
    return (
      <div className="optionsfield-options">
        { options.map((option, index) => (
          <div className="optionsfield-option" key={`option_${index}`}>
            <div className="optionsfield-option-title">
              <strong>{ option.title }</strong> ({ option.config.values.join(', ') })
            </div>
            <Button { ...this._getEditButton(index) } />
            <Button { ...this._getRemoveButton(index) } />
          </div>
        )) }
        <div className="optionsfield-add">
          <Button { ...this._getAdd() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  _getAdd() {
    return {
      label: '+ Add New',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getNew() {
    return {
      onDone: this._handleCreate
    }
  }

  _getEdit() {
    return {
      onDone: this._handleUpdate
    }
  }

  _getEditButton(index) {
    return {
      icon: 'pencil',
      className: 'optionsfield-option-action',
      handler: this._handleEdit.bind(this, index)
    }
  }

  _getRemoveButton(index) {
    return {
      icon: 'times',
      className: 'optionsfield-option-action',
      handler: this._handleRemove.bind(this, index)
    }
  }

  _handleAdd() {
    this.context.form.push(<New { ...this._getNew() } />)
  }

  _handleCreate(option) {
    this.setState({
      options: [
        ...this.state.options,
        option
      ]
    })
    this.context.form.pop()
  }

  _handleEdit(index) {
    this.context.form.push(<Edit { ...this._getEdit() } />)
  }

  _handleRemove(i) {
    this.setState({
      options: [
        ...this.state.options.filter((option, index) => {
          return index !== i
        })
      ]
    })
  }

  _handleUpdate() {}

}

export default OptionsField
