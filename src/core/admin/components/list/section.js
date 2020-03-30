import PropTypes from 'prop-types'
import Message from '../message'
import Item from './item'
import React from 'react'
import _ from 'lodash'

class Section extends React.Component {

  static propTypes = {
    component: PropTypes.any,
    content: PropTypes.any,
    empty: PropTypes.object,
    items: PropTypes.array,
    title: PropTypes.string
  }

  render() {
    const { component, content, empty, items, title } = this.props
    return (
      <div className="maha-list-section">
        { title &&
          <div className="maha-list-title">{ title }</div>
        }
        { component &&
          _.isFunction(component) ? React.createElement(component, content) : component
        }
        { content &&
          <div className="maha-list-item">
            <div className="maha-list-item-content">
              <div className="maha-list-item-content-value">
                { content }
              </div>
            </div>
          </div>
        }
        { items && items.length > 0 &&
          items.map((item, itemIndex) => (
            <Item key={`list_item_${itemIndex}`} { ...item } />
          ))
        }
        { empty && items && items.length === 0 &&
          <div className="maha-list-item">
            { _.isPlainObject(empty) ?
              <Message { ...empty } /> :
              <div className="maha-list-item-content">
                <div className="maha-list-item-content-value">
                  { _.isFunction(empty) ? React.createElement(empty, this.props) : empty }
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }

}

export default Section
