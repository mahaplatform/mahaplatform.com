import PropTypes from 'prop-types'
import Buttons from '../buttons'
import Section from './section'
import React from 'react'
import _ from 'lodash'

class List extends React.Component {

  static propTypes = {
    alert: PropTypes.object,
    buttons: PropTypes.array,
    className: PropTypes.string,
    empty: PropTypes.object,
    footer: PropTypes.any,
    header: PropTypes.any,
    items: PropTypes.array,
    sections: PropTypes.array
  }

  render() {
    const { alert, buttons, empty, footer, header, items, sections } = this.props
    return (
      <div className={ this._getClasses() }>
        { header &&
          <div className="maha-list-header">
            { _.isFunction(header) ? React.createElement(header) : header }
          </div>
        }
        { alert &&
          <div className={`maha-list-alert ${alert.color}`}>
            { alert.message }
          </div>
        }
        { sections &&
          sections.map((section, index) => (
            <Section { ...section } key={`list_section_${index}`} />
          ))
        }
        { items &&
          <Section items={ items } empty={ empty } />
        }
        { footer &&
          <div className="maha-list-footer">
            { _.isFunction(footer) ? React.createElement(footer) : footer }
          </div>
        }
        { buttons &&
          <div className="maha-list-buttons">
            <Buttons buttons={ buttons } />
          </div>
        }
      </div>
    )
  }

  _getClasses() {
    const { className } = this.props
    const classes = ['maha-list']
    if(className) classes.push(className)
    return classes.join(' ')
  }

}

export default List
