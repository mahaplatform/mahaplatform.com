import PropTypes from 'prop-types'
import React from 'react'

class Layout extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    embedded: PropTypes.bool,
    children: PropTypes.any
  }

  render() {
    const { config, embedded } = this.props
    return (
      <div className={ this._getClass() }>
        { !embedded && config.cover && config.cover.image &&
          <div className="maha-form-layout-image">
            { config.cover.caption &&
              <div className="maha-form-layout-image-caption" dangerouslySetInnerHTML={{ __html: config.cover.caption }} />
            }
          </div>
        }
        <div className="maha-form-layout-content">
          { this.props.children }
        </div>
      </div>
    )
  }

  _getClass() {
    const { config, embedded } = this.props
    const classes = ['maha-form-layout']
    if(!embedded && config.cover && config.cover.image) classes.push('covered')
    if(embedded) classes.push('embedded')
    return classes.join(' ')
  }

}

export default Layout
