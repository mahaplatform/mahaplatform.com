import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import New from './new'
import _ from 'lodash'

class OptionsField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    options: []
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
              <strong>{ option.title }</strong> ({ option.values.join(', ') })
            </div>
            <Button { ...this._getEditButton(option, index) } />
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

  componentDidUpdate(prevProps, prevState) {
    const { options } = this.state
    if(!_.isEqual(options, prevState.options)) {
      this._handleChange()
    }
  }

  _getAdd() {
    return {
      label: '+ Add Option',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getNew() {
    return {
      onDone: this._handleCreate
    }
  }

  _getEdit(option, index) {
    return {
      option,
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _getEditButton(option, index) {
    return {
      icon: 'pencil',
      className: 'optionsfield-option-action',
      handler: this._handleEdit.bind(this, option, index)
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

  _handleChange() {
    const { options } = this.state
    this.props.onChange(options)
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

  _handleEdit(option, index) {
    this.context.form.push(<Edit { ...this._getEdit(option, index) } />)
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

  _handleUpdate(index, newoption) {
    this.setState({
      options: [
        ...this.state.options.map((option, i) => {
          return i === index ? newoption : option
        })
      ]
    })
    this.context.form.pop()
  }

}

export default OptionsField
