import { Token } from 'maha-admin'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Sections extends React.PureComponent {

  static propTypes = {
    format: PropTypes.any,
    handler: PropTypes.func,
    route: PropTypes.func,
    sections: PropTypes.array,
    value: PropTypes.string
  }

  static defaultProps = {
    format: Token
  }

  render() {
    const { sections } = this.props
    return (
      <div className="list-sections">
        { sections.map((section, index) => (
          <div className="list-section" key={`item_${index}`}>
            <div className="list-section-title">
              { section.title}
            </div>
            <Items { ...this._getItems(section.items)} />
          </div>
        )) }
      </div>
    )
  }

  _getItems(items) {
    const { format, handler, route, value } = this.props
    return {
      format,
      handler,
      items,
      route,
      value
    }
  }

}

export default Sections
