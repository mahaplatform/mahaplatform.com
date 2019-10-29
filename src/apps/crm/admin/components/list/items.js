import { Format, Token } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Items extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    format: PropTypes.any,
    handler: PropTypes.func,
    items: PropTypes.array,
    route: PropTypes.func,
    value: PropTypes.string
  }

  static defaultProps = {
    format: Token
  }

  render() {
    const { format, items, value } = this.props
    return (
      <div className="list-items">
        { items.map((item, index) => (
          <div className="list-item" key={`item_${index}`} onClick={ this._handleClick.bind(this, item) }>
            <div className="list-item-details">
              { value ?
                <Format { ...item } format={ format } value={ _.get(item, value) } /> :
                <Format { ...item } format={ format } />
              }
            </div>
            <div className="list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _handleClick(item) {
    const { router } = this.context
    const { handler, route } = this.props
    console.log(this.props)
    if(handler) handler(item)
    if(route) router.history.push(route(item))
  }

}

export default Items
