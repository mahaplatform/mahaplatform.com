import PropTypes from 'prop-types'
import React from 'react'

class Groups extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="news-form-groups">
        <div className="news-form-group" onClick={ this._handleChoose.bind(this, null) }>
          <div className="news-form-group-icon">
            <i className="fa fa-globe" />
          </div>
          <div className="news-form-group-label">
            Everyone
          </div>
        </div>
        { records.map((group, index) => (
          <div className="news-form-group" key={`group_${index}`} onClick={ this._handleChoose.bind(this, group) }>
            <div className="news-form-group-icon">
              <i className="fa fa-users" />
            </div>
            <div className="news-form-group-label">
              { group.title }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleChoose(group) {
    const value = group ? {
      id: group.id,
      title: group.title,
      icon: 'users'
    } : null
    this.props.onChoose(value)
  }

}

export default Groups
