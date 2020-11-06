import { HelpArticleToken } from '@admin'
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
            <div className="maha-help-search-result-token">
              <HelpArticleToken { ...result } />
            </div>
            <div className="maha-help-search-result-proceed">
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleClick(id) {
    this.props.onClick(id)
  }

}

export default Results
