import { Button } from '@admin'
import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'
import _ from 'lodash'

const ChannelField = ({ entity, field, text }) => {

  class Component extends React.PureComponent {

    static contextTypes = {
      form: PropTypes.object
    }

    static propTypes = {
      defaultValue: PropTypes.array,
      tabIndex: PropTypes.number,
      onChange: PropTypes.func,
      onReady: PropTypes.func
    }

    state = {
      items: null
    }

    _handleNew = this._handleNew.bind(this)
    _handleCreate = this._handleCreate.bind(this)
    _handleChange = this._handleChange.bind(this)

    render() {
      const { tabIndex } = this.props
      const { items } = this.state
      if(!items) return null
      return (
        <div>
          <div className="channelfield" tabIndex={ tabIndex }>
            { items.length === 0 &&
              <div className="channelfield-item-empty" onClick={ this._handleNew }>
                Enter { entity }
              </div>
            }
            { items.map((item, index) => (
              <div className="channelfield-item" key={ `item_${index}` } onClick={ this._handlePrimary.bind(this, index) }>
                <div className="channelfield-item-primary">
                  { item.is_primary ?
                    <i className="fa fa-check-circle" /> :
                    <i className="fa fa-circle-o" />
                  }
                </div>
                <div className="channelfield-item-field">
                  { _.get(item, text) } { item.is_primary &&
                    <span className="alert">PRIMARY</span>
                  }
                </div>
                <Button { ...this._getEditButton(item, index) } />
                <Button { ...this._getRemoveButton(index) } />
              </div>
            ))}
          </div>
          { items.length > 0 &&
            <div className="channelfield-add">
              <Button { ...this._getAddButton() } />
            </div>
          }
        </div>
      )
    }

    componentDidMount() {
      const { defaultValue } = this.props
      this.setState({
        items: defaultValue || []
      })
      this.props.onReady()
    }

    componentDidUpdate(prevProps, prevState) {
      const { items } = this.state
      if(!_.isEqual(items, prevState.items)) {
        this._handleChange()
      }
    }

    _getAddButton() {
      return {
        label: `Add ${entity}`,
        className: 'link',
        handler: this._handleNew
      }
    }

    _getEditButton(item, index) {
      return {
        className: 'channelfield-item-action',
        icon: 'pencil',
        handler: this._handleEdit.bind(this, item, index)
      }
    }

    _getEdit(item, index) {
      return {
        entity,
        field,
        item,
        onDone: this._handleUpdate.bind(this, index)
      }
    }

    _getNew() {
      return {
        entity,
        field,
        onDone: this._handleCreate
      }
    }

    _getRemoveButton(index) {
      return {
        className: 'channelfield-item-action',
        icon: 'times',
        confirm: `Are you sure you want to remove this ${entity}?`,
        handler: this._handleRemove.bind(this, index)
      }
    }

    _handleChange() {
      const { items } = this.state
      this.props.onChange(items)
    }

    _handleCreate(item) {
      const { items } = this.state
      this.setState({
        items: [
          ...items,
          {
            ...item,
            is_primary: items.length === 0
          }
        ]
      })
      this.context.form.pop()
    }

    _handleEdit(item, index) {
      this.context.form.push(<Item { ...this._getEdit(item, index) } />)
    }

    _handleNew() {
      this.context.form.push(<Item { ...this._getNew() } />)
    }

    _handleRemove(index) {
      const { items } = this.state
      this.setState({
        items: items.filter((item, i) => {
          return i !== index
        }).map((item, i) => {
          if(i > 0) return item
          return {
            ...item,
            is_primary: items[index].is_primary ? true : item.is_primary
          }
        })
      })
    }

    _handlePrimary(index) {
      const { items } = this.state
      this.setState({
        items: items.map((item, i) => ({
          ...item,
          is_primary: i === index
        }))
      })
    }

    _handleUpdate(index, newitem) {
      const { items } = this.state
      this.setState({
        items: items.map((item, i) => ({
          ...i === index ? newitem : item
        }))
      })
      this.context.form.pop()
    }

  }

  return Component

}

export default ChannelField
