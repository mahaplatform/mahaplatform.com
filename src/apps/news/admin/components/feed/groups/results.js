import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.PureComponent {

  static propTypes = {
    group_id: PropTypes.number,
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="news-feed-groups-results">
        <div className={ this._getClass(null) } onClick={ this._handleChoose.bind(this, null) }>
          <div className="news-feed-group-icon">
            <i className="fa fa-fw fa-globe" />
          </div>
          <div className="news-feed-group-label">
            News Feed
          </div>
        </div>
        { records.map((group, index) => (
          <div className={ this._getClass(group.id) } key={`group_${index}`} onClick={ this._handleChoose.bind(this, group.id) }>
            <div className="news-feed-group-icon">
              <i className="fa fa-fw fa-users" />
            </div>
            <div className="news-feed-group-label">
              { group.title }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(group_id) {
    const classes = ['news-feed-group']
    if(group_id === this.props.group_id) classes.push('selected')
    return classes.join(' ')
  }


  _handleChoose(group_id) {
    this.props.onChoose(group_id)
  }

}

export default Results
