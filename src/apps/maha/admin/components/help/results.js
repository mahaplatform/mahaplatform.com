import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    onClick: PropTypes.func
  }

  render() {
    const { records  } = this.props
    return (
      <div className="maha-help-search-results">
        { records.map((result, index) => (
          <div className="maha-help-search-result" key={ `result_${index}` } onClick={ this._handleClick.bind(this, result.id) }>
            <div className="maha-help-search-result-icon">
              <div className={ `maha-help-search-result-app-icon ${result.app.color}` }>
                <i className={ `fa fa-${result.app.icon}` } />
              </div>
            </div>
            <div className="maha-help-search-result-text">
              { result.title }
            </div>
            <div className="maha-help-search-result-proceed">
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getIcon(result) {
    if(result.type === 'video') return 'file-video-o'
    if(result.type === 'article') return 'file-text-o'
  }

  _handleClick(id) {
    this.props.onClick(id)
  }

}

export default Results
