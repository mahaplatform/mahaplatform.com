import { Token } from 'maha-admin'
import PropTypes from 'prop-types'
import Sections from './sections'
import Items from './items'
import React from 'react'

class List extends React.PureComponent {

  static propTypes = {
    format: PropTypes.any,
    handler: PropTypes.func,
    sections: PropTypes.array,
    items: PropTypes.array,
    value: PropTypes.string
  }

  static defaultProps = {
    format: Token
  }

  render() {
    const { items, sections } = this.props
    return (
      <div className="list">
        { items &&
          <Items { ...this._getItems() } />
        }
        { sections &&
          <Sections { ...this._getSections() } />
        }
      </div>
    )
  }

  _getItems() {
    const { format, handler, items, value } = this.props
    return {
      format,
      handler,
      items,
      value
    }
  }

  _getSections() {
    const { format, handler, sections, value } = this.props
    return {
      format,
      handler,
      sections,
      value
    }
  }

  _handleClick(item) {
    this.props.handler(item)
  }

}

export default List
