import PropTypes from 'prop-types'
import React from 'react'

class Source extends React.Component {

  static propTypes = {
    count: PropTypes.number,
    source: PropTypes.object,
    onAdd: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { count, source } = this.props
    if(source.component) return <source.component { ...this._getComponent() } />
    return (
      <div className="maha-attachments-source" onClick={ this._handleChoose }>
        <div className="maha-attachments-source-logo">
          <div className={`maha-attachments-source-favicon ${source.service}`}>
            { source.icon ?
              <i className={`fa fa-${source.icon}`} /> :
              <img src={ `/admin/images/services/${source.service}.png` } />
            }
          </div>
        </div>
        <div className="maha-attachments-source-text">
          { source.label || source.username || source.service }
        </div>
        { count &&
          <div className="maha-attachments-source-count">
            <div className="maha-attachments-source-count-badge">
              { count }
            </div>
          </div>
        }
        <div className="maha-attachments-source-proceed">
          <i className="fa fa-fw fa-chevron-right" />
        </div>
      </div>
    )
  }

  _getComponent() {
    const { source } = this.props
    const { onAdd } = this.props
    return {
      ...source.props,
      type: source.id,
      onAdd
    }
  }

  _handleChoose() {
    return this.props.onChoose()
  }

}

export default Source
