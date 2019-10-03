import React from 'react'
import PropTypes from 'prop-types'
import Item from './item'
import moment from 'moment'
import Date from './date'

class Feed extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    records: PropTypes.array,
    onClick: PropTypes.func,
    onLoad: PropTypes.func
  }

  render() {
    return (
      <div className="maha-feed">
        <div className="maha-feed-items">
          { this._getRecords().map((record, index) => [
            record.newday ? <Date date={ record.item.created_at } key={`date_${index}`} /> : null,
            <Item key={`item_${index}`} { ...record } />
          ])}
        </div>
      </div>
    )
  }

  componentDidMount() {
    if(this.props.onLoad) this.props.onLoad(this.props.records)
  }

  _getRecords() {
    const { admin } = this.context
    const { records } = this.props
    return records.reduce((records, record) => {
      const newday = moment(record.created_at).format('D') !== moment(records.created_at).format('D')
      return {
        created_at: record.created_at,
        records: [
          ...records.records,
          {
            item: record,
            context: 'feed',
            newday,
            user: admin.user,
            onClick: this._handleClick.bind(this, record)
          }

        ]
      }
    }, { records: [], created_at: null }).records
  }

  _handleClick(item) {
    this.props.onClick(item)
  }

}

export default Feed
