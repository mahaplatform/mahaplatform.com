import PropTypes from 'prop-types'
import { Button } from '@admin'
import Special from './special'
import React from 'react'
import _ from 'lodash'

class SpecialsField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    defaultValue: PropTypes.array,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    specials: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)

  render() {
    const { specials } = this.state
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { specials.map((special, index) => (
            <div className="crm-recipientsfield-recipient" key={`special_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                <span className="crm-recipientsfield-recipient-extension">
                  { special.character === 'hash' ? '#' : '*' }
                </span>
                { special.character === 'hash' ? 'Hash Key' : 'Star Key' }
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleEdit.bind(this, index)}>
                <i className="fa fa-pencil" />
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleRemove.bind(this, index)}>
                <i className="fa fa-times" />
              </div>
            </div>
          ))}
          { specials.length < 2 &&
            <div className="crm-recipientsfield-recipients-add">
              <Button { ...this._getAdd() } />
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      specials: defaultValue
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { specials } = this.state
    if(!_.isEqual(specials, prevState.specials)) {
      this.props.onChange(specials)
    }
  }

  _getAdd() {
    return {
      label: 'Add Special Character',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getEdit(index) {
    const { specials } = this.state
    return {
      defaultValue: specials[index],
      mode: 'edit',
      specials,
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _getNew() {
    const { specials } = this.state
    return {
      mode: 'new',
      specials,
      onDone: this._handleCreate
    }
  }

  _handleAdd() {
    this.context.form.push(Special, this._getNew())
  }

  _handleEdit(index) {
    this.context.form.push(Special, this._getEdit(index))
  }

  _handleCreate(special) {
    this.setState({
      specials: [
        ...this.state.specials,
        special
      ]
    })
  }

  _handleRemove(remove) {
    this.setState({
      specials: this.state.specials.filter((special, index) => {
        return index !== remove
      })
    })
  }

  _handleUpdate(i, updated) {
    const { specials } = this.state
    this.setState({
      specials: specials.map((special, index) => {
        return index === i ? updated : special
      })
    })
  }

}

export default SpecialsField
